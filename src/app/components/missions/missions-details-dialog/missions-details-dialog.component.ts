import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, MapPin, Calendar } from 'lucide-angular';
import { MissionsResponse } from '../../../models/Missions';
import { MissionStatus } from '../../../models/enums';

@Component({
  selector: 'app-missions-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './missions-details-dialog.component.html',
  styleUrl: './missions-details-dialog.component.css'
})
export class MissionsDetailsDialogComponent {
  readonly X = X;
  readonly MapPin = MapPin;
  readonly Calendar = Calendar;

  @Input() open = false;
  @Input() mission: MissionsResponse | null = null;
  @Output() openChange = new EventEmitter<boolean>();

  handleOpenChange(newOpen: boolean) {
    this.openChange.emit(newOpen);
  }

  getStatusLabel(status: MissionStatus): string {
    switch (status) {
      case MissionStatus.PLANNED: return 'Planifiée';
      case MissionStatus.IN_PROGRESS: return 'En cours';
      case MissionStatus.COMPLETED: return 'Terminée';
      case MissionStatus.CANCELLED: return 'Annulée';
      default: return 'Inconnu';
    }
  }

  getStatusColor(status: MissionStatus): string {
    switch (status) {
      case MissionStatus.PLANNED: return 'bg-blue-600';
      case MissionStatus.IN_PROGRESS: return 'bg-orange-600';
      case MissionStatus.COMPLETED: return 'bg-green-600';
      case MissionStatus.CANCELLED: return 'bg-red-600';
      default: return 'bg-gray-400';
    }
  }

  formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
