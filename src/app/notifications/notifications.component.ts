import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CircleAlert, Calendar, FileText, Shield, Check, Trash2 } from 'lucide-angular';
import { NotificationStateService } from '../services/notifications/notification-state.service';
import { NotificationsResponse } from '../models/Notifications';
import { Subscription } from 'rxjs';

type NotificationType = 'missions' | 'gardes' | 'absences' | 'systeme';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit, OnDestroy {
  readonly CircleAlert = CircleAlert;
  readonly Calendar = Calendar;
  readonly FileText = FileText;
  readonly Shield = Shield;
  readonly Check = Check;
  readonly Trash2 = Trash2;

  statusFilter: 'all' | 'unread' | 'read' = 'all';
  typeFilter: string | 'all' = 'all';

  notifications: NotificationsResponse[] = [];
  private notificationsSubscription?: Subscription;

  constructor(private notificationStateService: NotificationStateService) {}

  ngOnInit(): void {
    // S'abonner aux notifications
    this.notificationsSubscription = this.notificationStateService.notifications$.subscribe({
      next: (notifications) => {
        this.notifications = notifications;
      }
    });
  }

  ngOnDestroy(): void {
    this.notificationsSubscription?.unsubscribe();
  }

  get filteredNotifications() {
    return this.notifications.filter(notif => {
      const matchesStatus =
        this.statusFilter === 'all' ||
        (this.statusFilter === 'unread' && !notif.isRead) ||
        (this.statusFilter === 'read' && notif.isRead);

      const matchesType = this.typeFilter === 'all' || notif.notificationType === this.typeFilter;

      return matchesStatus && matchesType;
    });
  }

  get unreadCount() {
    return this.notifications.filter(n => !n.isRead).length;
  }

  markAllAsRead() {
    this.notificationStateService.markAllAsRead();
  }

  toggleNotificationRead(trackingId: string) {
    const notif = this.notifications.find(n => n.trackingId === trackingId);
    if (notif && !notif.isRead) {
      this.notificationStateService.markAsRead(trackingId);
    }
  }

  deleteNotification(trackingId: string) {
    this.notificationStateService.deleteNotification(trackingId);
  }

  getNotificationIcon(type: string) {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('mission')) return this.CircleAlert;
    if (lowerType.includes('garde') || lowerType.includes('duty')) return this.Calendar;
    if (lowerType.includes('absence')) return this.FileText;
    return this.Shield;
  }

  getNotificationColor(type: string): string {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('mission')) return 'text-red-600';
    if (lowerType.includes('garde') || lowerType.includes('duty')) return 'text-blue-600';
    if (lowerType.includes('absence')) return 'text-orange-600';
    return 'text-gray-600';
  }

  formatTimestamp(dateString: string): string {
    if (!dateString) return 'Date inconnue';

    // Si le format est LocalDateTime de Java (ex: "2025-11-14T10:30:00"), ajouter 'Z' pour UTC
    let dateStr = dateString;
    if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/) && !dateString.endsWith('Z')) {
      dateStr = dateString + 'Z';
    }

    const date = new Date(dateStr);

    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      console.error('Invalid date format:', dateString);
      return 'Date invalide';
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMinutes < 1) return 'À l\'instant';
    if (diffMinutes < 60) return `il y a ${diffMinutes}min`;
    if (diffHours < 24) return `il y a ${diffHours}h`;
    if (diffDays < 7) return `il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR');
  }
}
