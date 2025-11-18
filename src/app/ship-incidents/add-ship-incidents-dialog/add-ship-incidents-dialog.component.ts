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
    incidentNumber: '',
    dateTime: '',
    location: '',
    incidentDescription: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
    incidentNumber: '',
    dateTime: '',
    location: '',
    incidentDescription: '',
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
    if (!this.formData.incidentNumber || (typeof this.formData.incidentNumber === 'string' && !this.formData.incidentNumber.trim())) {
      newErrors['incidentNumber'] = 'Numéro d'incident est requis';
    }
    if (!this.formData.dateTime || (typeof this.formData.dateTime === 'string' && !this.formData.dateTime.trim())) {
      newErrors['dateTime'] = 'Date et heure est requis';
    }
    if (!this.formData.location || (typeof this.formData.location === 'string' && !this.formData.location.trim())) {
      newErrors['location'] = 'Localisation est requis';
    }
    if (!this.formData.incidentDescription || (typeof this.formData.incidentDescription === 'string' && !this.formData.incidentDescription.trim())) {
      newErrors['incidentDescription'] = 'Description de l'incident est requis';
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
