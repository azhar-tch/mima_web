import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShipIncidentRequest } from '../../models/Maritime';

@Component({
  selector: 'app-add-ship-incidents-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-ship-incidents-dialog.component.html',
  styleUrl: './add-ship-incidents-dialog.component.css'
})
export class AddShipIncidentsDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ShipIncidentRequest>();

  formData: ShipIncidentRequest = {
    commercialShipTrackingId: '',
    incidentDate: '',
    incidentType: '',
    location: '',
    description: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      commercialShipTrackingId: '',
      incidentDate: '',
      incidentType: '',
      location: '',
      description: '',
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
    if (!this.formData.incidentDate || (typeof this.formData.incidentDate === 'string' && !this.formData.incidentDate.trim())) {
      newErrors['incidentDate'] = "Date de l'incident est requis";
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
