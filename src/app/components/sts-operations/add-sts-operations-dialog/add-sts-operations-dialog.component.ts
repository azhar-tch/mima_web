import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { STSOperationRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-add-sts-operations-dialog',
  standalone: true,
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
    motherVesselTrackingId: '',
    receivingVesselTrackingId: '',
    startDate: '',
    endDate: '',
    cargoType: '',
    quantityTransferred: undefined,
    unit: '',
    location: '',
    latitude: undefined,
    longitude: undefined,
    maritimeZone: '',
    weatherConditions: '',
    seaState: undefined,
    stsOperator: '',
    authorizationNumber: '',
    authorizingAuthority: '',
    supervisingNavalVesselTrackingId: '',
    surveyCompany: '',
    emergencyPlanEstablished: undefined,
    pollutionPreventionEquipment: '',
    incidents: '',
    pollutionOccurred: undefined,
    pollutionType: '',
    incidentMeasures: '',
    status: '',
    isCompleted: undefined,
    reportEstablished: undefined,
    reportReference: '',
    compliantWithStandards: undefined,
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      operationNumber: '',
      motherVesselTrackingId: '',
      receivingVesselTrackingId: '',
      startDate: '',
      endDate: '',
      cargoType: '',
      quantityTransferred: undefined,
      unit: '',
      location: '',
      latitude: undefined,
      longitude: undefined,
      maritimeZone: '',
      weatherConditions: '',
      seaState: undefined,
      stsOperator: '',
      authorizationNumber: '',
      authorizingAuthority: '',
      supervisingNavalVesselTrackingId: '',
      surveyCompany: '',
      emergencyPlanEstablished: undefined,
      pollutionPreventionEquipment: '',
      incidents: '',
      pollutionOccurred: undefined,
      pollutionType: '',
      incidentMeasures: '',
      status: '',
      isCompleted: undefined,
      reportEstablished: undefined,
      reportReference: '',
      compliantWithStandards: undefined,
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
      newErrors['operationNumber'] = "Numéro d'opération est requis";
    }
    if (!this.formData.startDate || (typeof this.formData.startDate === 'string' && !this.formData.startDate.trim())) {
      newErrors['startDate'] = "Date et heure de début est requis";
    }
    if (!this.formData.location || (typeof this.formData.location === 'string' && !this.formData.location.trim())) {
      newErrors['location'] = "Localisation est requis";
    }
    if (!this.formData.motherVesselTrackingId || (typeof this.formData.motherVesselTrackingId === 'string' && !this.formData.motherVesselTrackingId.trim())) {
      newErrors['motherVesselTrackingId'] = "Navire source est requis";
    }
    if (!this.formData.receivingVesselTrackingId || (typeof this.formData.receivingVesselTrackingId === 'string' && !this.formData.receivingVesselTrackingId.trim())) {
      newErrors['receivingVesselTrackingId'] = "Navire destination est requis";
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
