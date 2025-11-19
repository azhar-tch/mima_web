import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { NavalVesselRequest } from '../../../models/Maritime';
import { NavalVesselType } from '../../../models/enums';

@Component({
  selector: 'app-add-naval-vessels-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-naval-vessels-dialog.component.html',
  styleUrl: './add-naval-vessels-dialog.component.css'
})
export class AddNavalVesselsDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<NavalVesselRequest>();

  formData: NavalVesselRequest = {
    vesselNumber: '',
    vesselType: NavalVesselType.PHM,
    vesselName: '',
    hullNumber: '',
    yearCommissioned: undefined,
    dateCommissioned: '',
    dateDecommissioned: '',
    length: undefined,
    width: undefined,
    draft: undefined,
    displacement: undefined,
    maxSpeed: undefined,
    crewCapacity: undefined,
    fuelCapacity: undefined,
    range: undefined,
    armament: '',
    electronics: '',
    engineType: '',
    enginePower: undefined,
    homePort: '',
    operationalStatus: undefined,
    currentLocation: '',
    currentMission: '',
    lastMaintenanceDate: '',
    nextMaintenanceDate: '',
    totalOperationalHours: undefined,
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      vesselNumber: '',
      vesselType: NavalVesselType.PHM,
      vesselName: '',
      hullNumber: '',
      yearCommissioned: undefined,
      dateCommissioned: '',
      dateDecommissioned: '',
      length: undefined,
      width: undefined,
      draft: undefined,
      displacement: undefined,
      maxSpeed: undefined,
      crewCapacity: undefined,
      fuelCapacity: undefined,
      range: undefined,
      armament: '',
      electronics: '',
      engineType: '',
      enginePower: undefined,
      homePort: '',
      operationalStatus: undefined,
      currentLocation: '',
      currentMission: '',
      lastMaintenanceDate: '',
      nextMaintenanceDate: '',
      totalOperationalHours: undefined,
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
    if (!this.formData.vesselNumber || (typeof this.formData.vesselNumber === 'string' && !this.formData.vesselNumber.trim())) {
      newErrors['vesselNumber'] = 'Numéro du navire est requis';
    }
    if (!this.formData.vesselName || (typeof this.formData.vesselName === 'string' && !this.formData.vesselName.trim())) {
      newErrors['vesselName'] = 'Nom du navire est requis';
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
