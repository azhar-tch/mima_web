import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShipProvisioningRequest } from '../../models/Maritime';

@Component({
  selector: 'app-add-ship-provisionings-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-ship-provisionings-dialog.component.html',
  styleUrl: './add-ship-provisionings-dialog.component.css'
})
export class AddShipProvisioningsDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ShipProvisioningRequest>();

  formData: ShipProvisioningRequest = {
    provisioningNumber: '',
    dateTime: '',
    location: '',
    provisionType: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
    provisioningNumber: '',
    dateTime: '',
    location: '',
    provisionType: '',
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
    if (!this.formData.provisioningNumber || (typeof this.formData.provisioningNumber === 'string' && !this.formData.provisioningNumber.trim())) {
      newErrors['provisioningNumber'] = 'Numéro d'avitaillement est requis';
    }
    if (!this.formData.dateTime || (typeof this.formData.dateTime === 'string' && !this.formData.dateTime.trim())) {
      newErrors['dateTime'] = 'Date et heure est requis';
    }
    if (!this.formData.location || (typeof this.formData.location === 'string' && !this.formData.location.trim())) {
      newErrors['location'] = 'Localisation est requis';
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
