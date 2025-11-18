import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { EscortMissionRequest } from '../../models/Maritime';
import { MissionStatus, EscortType } from '../../models/enums';

@Component({
  selector: 'app-add-escort-missions-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-escort-missions-dialog.component.html',
  styleUrl: './add-escort-missions-dialog.component.css'
})
export class AddEscortMissionsDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<EscortMissionRequest>();

  formData: EscortMissionRequest = {
    missionNumber: '',
    commercialShipTrackingId: '',
    navalVesselTrackingId: '',
    startDate: '',
    endDate: '',
    departurePoint: '',
    arrivalPoint: '',
    escortType: EscortType.STANDARD,
    escortZone: '',
    status: MissionStatus.PLANNED,
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
    missionNumber: '',
    commercialShipTrackingId: '',
    navalVesselTrackingId: '',
    startDate: '',
    endDate: '',
    departurePoint: '',
    arrivalPoint: '',
    escortType: EscortType.STANDARD,
    escortZone: '',
    status: MissionStatus.PLANNED,
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
    if (!this.formData.missionNumber || (typeof this.formData.missionNumber === 'string' && !this.formData.missionNumber.trim())) {
      newErrors['missionNumber'] = 'Numéro de mission est requis';
    }
    if (!this.formData.startDate || (typeof this.formData.startDate === 'string' && !this.formData.startDate.trim())) {
      newErrors['startDate'] = 'Date de début est requis';
    }
    if (!this.formData.departurePoint || (typeof this.formData.departurePoint === 'string' && !this.formData.departurePoint.trim())) {
      newErrors['departurePoint'] = 'Point de départ est requis';
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
