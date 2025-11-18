import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ArmedGuardMissionRequest } from '../../models/Maritime';

@Component({
  selector: 'app-add-armed-guard-missions-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-armed-guard-missions-dialog.component.html',
  styleUrl: './add-armed-guard-missions-dialog.component.css'
})
export class AddArmedGuardMissionsDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ArmedGuardMissionRequest>();

  formData: ArmedGuardMissionRequest = {
    missionNumber: '',
    embarkationDate: '',
    disembarkationDate: '',
    embarkationPort: '',
    disembarkationPort: '',
    personnelCount: undefined,
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
    missionNumber: '',
    embarkationDate: '',
    disembarkationDate: '',
    embarkationPort: '',
    disembarkationPort: '',
    personnelCount: undefined,
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
    if (!this.formData.embarkationDate || (typeof this.formData.embarkationDate === 'string' && !this.formData.embarkationDate.trim())) {
      newErrors['embarkationDate'] = 'Date d'embarquement est requis';
    }
    if (!this.formData.embarkationPort || (typeof this.formData.embarkationPort === 'string' && !this.formData.embarkationPort.trim())) {
      newErrors['embarkationPort'] = 'Port d'embarquement est requis';
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
