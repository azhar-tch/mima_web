import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ConservatorSeizureRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-add-conservator-seizures-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-conservator-seizures-dialog.component.html',
  styleUrl: './add-conservator-seizures-dialog.component.css'
})
export class AddConservatorSeizuresDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ConservatorSeizureRequest>();

  formData: ConservatorSeizureRequest = {
    commercialShipTrackingId: '',
    seizureDate: '',
    seizureLocation: '',
    seizureReason: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
    commercialShipTrackingId: '',
    seizureDate: '',
    seizureLocation: '',
    seizureReason: '',
    observations: ''
    };
    this.errors = {};
  }

  handleClose() {
    this.close.emit();
    this.handleReset();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.commercialShipTrackingId || (typeof this.formData.commercialShipTrackingId === 'string' && !this.formData.commercialShipTrackingId.trim())) {
      newErrors['commercialShipTrackingId'] = "ID Navire commercial est requis";
    }
    if (!this.formData.seizureDate || (typeof this.formData.seizureDate === 'string' && !this.formData.seizureDate.trim())) {
      newErrors['seizureDate'] = "Date de saisie est requis";
    }

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.add.emit(this.formData);
      this.handleReset();
    }
  }
}
