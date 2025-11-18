import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, Calendar, Clock, User, Building } from 'lucide-angular';
import { DutiesResponse } from '../../../models/Duties';
import { DutyType, DutyStatus } from '../../../models/enums';

@Component({
  selector: 'app-duty-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './duty-details-dialog.component.html',
  styleUrl: './duty-details-dialog.component.css'
})
export class DutyDetailsDialogComponent {
  readonly X = X;
  readonly Calendar = Calendar;
  readonly Clock = Clock;
  readonly User = User;
  readonly Building = Building;

  @Input() duty: DutiesResponse | null = null;
  @Output() close = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  calculateDuration(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours >= 24) {
      const days = Math.floor(diffHours / 24);
      const hours = diffHours % 24;
      return `${days} jour${days > 1 ? 's' : ''} ${hours}h`;
    }

    return `${diffHours}h ${diffMinutes}m`;
  }

  getStatusLabel(status: DutyStatus): string {
    switch (status) {
      case DutyStatus.PLANNED: return 'Planifiée';
      case DutyStatus.COMPLETED: return 'Terminée';
      case DutyStatus.REPLACED: return 'Remplacée';
      default: return status;
    }
  }

  getTypeLabel(type: DutyType): string {
    switch (type) {
      case DutyType.WATCH: return 'Quart';
      case DutyType.BRIDGE_WATCH: return 'Quart de passerelle';
      case DutyType.ENGINE_WATCH: return 'Quart machine';
      case DutyType.ANCHOR_WATCH: return 'Quart au mouillage';
      case DutyType.PORT_WATCH: return 'Quart au port';
      case DutyType.STANDBY: return 'Astreinte';
      default: return type;
    }
  }

  getStatusBadgeStyle(status: DutyStatus): string {
    switch (status) {
      case DutyStatus.PLANNED: return 'bg-blue-500 text-white';
      case DutyStatus.COMPLETED: return 'bg-green-600 text-white';
      case DutyStatus.REPLACED: return 'bg-orange-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  }

  getTypeBadgeStyle(type: DutyType): string {
    switch (type) {
      case DutyType.WATCH: return 'bg-purple-500 text-white';
      case DutyType.BRIDGE_WATCH: return 'bg-indigo-500 text-white';
      case DutyType.ENGINE_WATCH: return 'bg-yellow-600 text-white';
      case DutyType.ANCHOR_WATCH: return 'bg-cyan-500 text-white';
      case DutyType.PORT_WATCH: return 'bg-teal-500 text-white';
      case DutyType.STANDBY: return 'bg-gray-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  }
}
