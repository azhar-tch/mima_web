import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShipArrivalDepartureRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-add-ship-arrival-departures-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-ship-arrival-departures-dialog.component.html',
  styleUrl: './add-ship-arrival-departures-dialog.component.css'
})
export class AddShipArrivalDeparturesDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ShipArrivalDepartureRequest>();

  formData: ShipArrivalDepartureRequest = {
    commercialShipTrackingId: '',
    arrivalDate: '',
    departureDate: '',
    portOfOrigin: '',
    portOfDestination: '',
    captainName: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      commercialShipTrackingId: '',
      arrivalDate: '',
      departureDate: '',
      portOfOrigin: '',
      portOfDestination: '',
      captainName: '',
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
    // Pas de validation spécifique

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
