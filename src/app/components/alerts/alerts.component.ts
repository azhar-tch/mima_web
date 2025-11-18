import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertCircle, Info, X } from 'lucide-angular';

type AlertType = 'critique' | 'important' | 'info';

interface Alert {
  id: number;
  type: AlertType;
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
}

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {
  readonly AlertCircle = AlertCircle;
  readonly Info = Info;
  readonly X = X;

  filterType: 'toutes' | AlertType = 'toutes';

  alerts: Alert[] = [
    {
      id: 1,
      type: 'critique',
      title: 'Défaillance moteur détectée',
      description: "Le moteur principal de l'unité 3 affiche des signes de surchauffe. Maintenance immédiate recommandée.",
      timestamp: new Date(Date.now() - 5 * 60000),
      isRead: false
    },
    {
      id: 2,
      type: 'important',
      title: 'Maintenance programmée',
      description: "Maintenance programmée pour l'unité 5 demain à 08h00. Vérifier la disponibilité du personnel.",
      timestamp: new Date(Date.now() - 30 * 60000),
      isRead: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Nouvelle mission assignée',
      description: "La mission M-2024-156 a été assignée à l'équipe Bravo. Vérifier les détails dans la section des missions.",
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      isRead: true
    },
    {
      id: 4,
      type: 'critique',
      title: 'Alerte combustible faible',
      description: "Niveau de combustible critique pour l'unité 7. Ravitaillement urgente nécessaire.",
      timestamp: new Date(Date.now() - 3 * 60 * 60000),
      isRead: false
    },
    {
      id: 5,
      type: 'important',
      title: 'Changement de personnel',
      description: "Le personnel Jean Martin prend sa retraite le 15 décembre. Préparer le remplacement.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60000),
      isRead: true
    }
  ];

  get filteredAlerts() {
    if (this.filterType === 'toutes') {
      return this.alerts;
    }
    return this.alerts.filter(alert => alert.type === this.filterType);
  }

  toggleRead(id: number) {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.isRead = !alert.isRead;
    }
  }

  dismissAlert(id: number) {
    this.alerts = this.alerts.filter(alert => alert.id !== id);
  }

  getAlertBorderColor(type: AlertType): string {
    switch (type) {
      case 'critique': return 'border-red-500';
      case 'important': return 'border-orange-500';
      case 'info': return 'border-blue-500';
    }
  }

  getAlertBgColor(type: AlertType): string {
    switch (type) {
      case 'critique': return 'bg-red-50';
      case 'important': return 'bg-orange-50';
      case 'info': return 'bg-blue-50';
    }
  }

  getAlertTextColor(type: AlertType): string {
    switch (type) {
      case 'critique': return 'text-red-900';
      case 'important': return 'text-orange-900';
      case 'info': return 'text-blue-900';
    }
  }

  getAlertIcon(type: AlertType) {
    switch (type) {
      case 'critique': return this.AlertCircle;
      case 'important': return this.AlertCircle;
      case 'info': return this.Info;
    }
  }

  formatTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins}m`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return `Il y a ${diffDays}j`;
  }
}
