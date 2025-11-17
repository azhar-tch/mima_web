import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationsResponse } from '../../models/Notifications';
import { NotificationStreamService } from './notification-stream.service';
import { NotificationsService } from './notifications.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationStateService {
  private notificationsSubject = new BehaviorSubject<NotificationsResponse[]>([]);
  private unreadCountSubject = new BehaviorSubject<number>(0);

  public notifications$ = this.notificationsSubject.asObservable();
  public unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(
    private notificationStreamService: NotificationStreamService,
    private notificationsService: NotificationsService,
    private toastService: ToastService
  ) {}

  /**
   * Initialise le service en chargeant les notifications existantes et en se connectant au flux
   */
  initialize(userTrackingId: string): void {
    // Charger les notifications existantes
    this.loadNotifications(userTrackingId);

    // Se connecter au flux pour recevoir les nouvelles notifications
    this.notificationStreamService.connect(userTrackingId).subscribe({
      next: (notification) => {
        this.addNotification(notification);
        // Afficher un toast pour la nouvelle notification
        this.showToastNotification(notification);
        // Afficher une notification système du navigateur
        this.showBrowserNotification(notification);
      },
      error: (err) => console.error('Error in notification stream:', err)
    });
  }

  /**
   * Charge toutes les notifications de l'utilisateur
   */
  private loadNotifications(userTrackingId: string): void {
    this.notificationsService.listByRecipient(userTrackingId).subscribe({
      next: (res) => {
        this.notificationsSubject.next(res.data);
        this.updateUnreadCount(res.data);
      },
      error: (err) => console.error('Error loading notifications:', err)
    });
  }

  /**
   * Ajoute une nouvelle notification à la liste
   */
  private addNotification(notification: NotificationsResponse): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([notification, ...current]);
    this.updateUnreadCount([notification, ...current]);
  }

  /**
   * Marque une notification comme lue
   */
  markAsRead(trackingId: string): void {
    this.notificationsService.markAsRead(trackingId).subscribe({
      next: () => {
        const current = this.notificationsSubject.value;
        const updated = current.map(n =>
          n.trackingId === trackingId ? { ...n, isRead: true } : n
        );
        this.notificationsSubject.next(updated);
        this.updateUnreadCount(updated);
      },
      error: (err) => console.error('Error marking notification as read:', err)
    });
  }

  /**
   * Marque toutes les notifications comme lues
   */
  markAllAsRead(): void {
    const current = this.notificationsSubject.value;
    const unread = current.filter(n => !n.isRead);

    unread.forEach(notification => {
      this.notificationsService.markAsRead(notification.trackingId).subscribe();
    });

    const updated = current.map(n => ({ ...n, isRead: true }));
    this.notificationsSubject.next(updated);
    this.updateUnreadCount(updated);
  }

  /**
   * Supprime une notification
   */
  deleteNotification(trackingId: string): void {
    this.notificationsService.deleteNotification(trackingId).subscribe({
      next: () => {
        const current = this.notificationsSubject.value;
        const updated = current.filter(n => n.trackingId !== trackingId);
        this.notificationsSubject.next(updated);
        this.updateUnreadCount(updated);
      },
      error: (err) => console.error('Error deleting notification:', err)
    });
  }

  /**
   * Met à jour le compteur de notifications non lues
   */
  private updateUnreadCount(notifications: NotificationsResponse[]): void {
    const count = notifications.filter(n => !n.isRead).length;
    this.unreadCountSubject.next(count);
  }

  /**
   * Affiche un toast pour une nouvelle notification
   */
  private showToastNotification(notification: NotificationsResponse): void {
    const type = this.getNotificationType(notification.notificationType);
    // Augmenter la durée à 10 secondes pour tester
    this.toastService.show(notification.message, type, 10000);
  }

  /**
   * Détermine le type de toast en fonction du type de notification
   */
  private getNotificationType(notificationType: string): 'success' | 'info' | 'warning' | 'error' {
    const lowerType = notificationType.toLowerCase();

    if (lowerType.includes('supprim') || lowerType.includes('annul') || lowerType.includes('rejet')) {
      return 'warning';
    }
    if (lowerType.includes('approuv') || lowerType.includes('valid') || lowerType.includes('termin')) {
      return 'success';
    }
    if (lowerType.includes('erreur') || lowerType.includes('échec') || lowerType.includes('échoué')) {
      return 'error';
    }
    return 'info';
  }

  /**
   * Affiche une notification système du navigateur
   */
  private showBrowserNotification(notification: NotificationsResponse): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('MIMA - Nouvelle notification', {
        body: notification.message,
        icon: '/assets/logo.png', // Assurez-vous d'avoir un logo
        badge: '/assets/badge.png'
      });
    }
  }

  /**
   * Demande la permission pour les notifications système
   */
  requestNotificationPermission(): void {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  /**
   * Se déconnecte du flux de notifications
   */
  disconnect(): void {
    this.notificationStreamService.disconnect();
  }
}
