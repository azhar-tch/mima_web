import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { AbsencesResponse } from '../../../models/Absences';
import { AbsenceStatus, AbsenceType } from '../../../models/enums';

@Component({
  selector: 'app-absence-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './absence-details-dialog.component.html',
  styleUrl: './absence-details-dialog.component.css'
})
export class AbsenceDetailsDialogComponent {
  readonly X = X;
  readonly AbsenceStatus = AbsenceStatus;

  @Input() absence: AbsencesResponse | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() approve = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getStatusBadgeStyle(status: AbsenceStatus): string {
    switch (status) {
      case AbsenceStatus.PENDING:
        return 'bg-orange-500 text-white';
      case AbsenceStatus.APPROVED:
        return 'bg-green-600 text-white';
      case AbsenceStatus.REJECTED:
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  }

  getStatusLabel(status: AbsenceStatus): string {
    switch (status) {
      case AbsenceStatus.PENDING: return 'En attente';
      case AbsenceStatus.APPROVED: return 'Approuvée';
      case AbsenceStatus.REJECTED: return 'Rejetée';
      default: return status;
    }
  }

  getTypeLabel(type: AbsenceType): string {
    switch (type) {
      case AbsenceType.SICK_LEAVE: return 'Maladie';
      case AbsenceType.ANNUAL_LEAVE: return 'Congé annuel';
      case AbsenceType.MATERNITY_LEAVE: return 'Congé maternité';
      case AbsenceType.PATERNITY_LEAVE: return 'Congé paternité';
      case AbsenceType.UNPAID_LEAVE: return 'Congé sans solde';
      case AbsenceType.SPECIAL_LEAVE: return 'Congé spécial';
      case AbsenceType.TRAINING: return 'Formation';
      case AbsenceType.FAMILY_EMERGENCY: return 'Urgence familiale';
      default: return type;
    }
  }

  handleApprove() {
    this.approve.emit();
  }

  handleReject() {
    this.reject.emit();
  }

  getAgentInitials(name: string | undefined): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }
}
