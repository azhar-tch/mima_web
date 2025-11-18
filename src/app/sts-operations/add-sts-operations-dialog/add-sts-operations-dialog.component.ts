import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { STSOperationRequest } from '../../models/Maritime';

@Component({
  selector: 'app-add-sts-operations-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-sts-operations-dialog.component.html',
  styleUrl: './add-sts-operations-dialog.component.css'
})
export class AddStsOperationsDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<STSOperationRequest>();

  formData: STSOperationRequest = {
    operationNumber: '',
    dateTimeStart: '',
    dateTimeEnd: '',
    location: '',
    vesselFrom: '',
    vesselTo: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
    operationNumber: '',
    dateTimeStart: '',
    dateTimeEnd: '',
    location: '',
    vesselFrom: '',
    vesselTo: '',
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
    if (!this.formData.operationNumber || (typeof this.formData.operationNumber === 'string' && !this.formData.operationNumber.trim())) {
      newErrors['operationNumber'] = 'Numéro d'opération est requis';
    }
    if (!this.formData.dateTimeStart || (typeof this.formData.dateTimeStart === 'string' && !this.formData.dateTimeStart.trim())) {
      newErrors['dateTimeStart'] = 'Date et heure de début est requis';
    }
    if (!this.formData.location || (typeof this.formData.location === 'string' && !this.formData.location.trim())) {
      newErrors['location'] = 'Localisation est requis';
    }
    if (!this.formData.vesselFrom || (typeof this.formData.vesselFrom === 'string' && !this.formData.vesselFrom.trim())) {
      newErrors['vesselFrom'] = 'Navire source est requis';
    }
    if (!this.formData.vesselTo || (typeof this.formData.vesselTo === 'string' && !this.formData.vesselTo.trim())) {
      newErrors['vesselTo'] = 'Navire destination est requis';
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
