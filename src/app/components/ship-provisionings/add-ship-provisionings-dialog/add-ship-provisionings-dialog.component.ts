import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShipProvisioningRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-add-ship-provisionings-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-ship-provisionings-dialog.component.html',
  styleUrl: './add-ship-provisionings-dialog.component.css'
})
export class AddShipProvisioningsDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ShipProvisioningRequest>();

  formData: ShipProvisioningRequest = {
    commercialShipTrackingId: '',
    provisioningDate: '',
    provisioningType: '',
    provisioningPoint: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      commercialShipTrackingId: '',
      provisioningDate: '',
      provisioningType: '',
      provisioningPoint: '',
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
      newErrors['commercialShipTrackingId'] = 'Navire commercial est requis';
    }
    if (!this.formData.provisioningDate || (typeof this.formData.provisioningDate === 'string' && !this.formData.provisioningDate.trim())) {
      newErrors['provisioningDate'] = "Date d'avitaillement est requis";
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
