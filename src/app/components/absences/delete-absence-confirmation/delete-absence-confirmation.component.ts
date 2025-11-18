import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { AbsencesResponse } from '../../../models/Absences';
import { AbsenceType } from '../../../models/enums';

@Component({
  selector: 'app-delete-absence-confirmation',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-absence-confirmation.component.html',
  styleUrl: './delete-absence-confirmation.component.css'
})
export class DeleteAbsenceConfirmationComponent {
  readonly X = X;

  @Input() absence: AbsencesResponse | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
    this.handleClose();
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
