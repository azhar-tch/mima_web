import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { SecurityAgencyRequest } from '../../models/Maritime';

@Component({
  selector: 'app-add-security-agencies-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-security-agencies-dialog.component.html',
  styleUrl: './add-security-agencies-dialog.component.css'
})
export class AddSecurityAgenciesDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<SecurityAgencyRequest>();

  formData: SecurityAgencyRequest = {
    agencyNumber: '',
    agencyName: '',
    phoneNumber: '',
    email: '',
    address: '',
    contactPerson: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
    agencyNumber: '',
    agencyName: '',
    phoneNumber: '',
    email: '',
    address: '',
    contactPerson: '',
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
    if (!this.formData.agencyNumber || (typeof this.formData.agencyNumber === 'string' && !this.formData.agencyNumber.trim())) {
      newErrors['agencyNumber'] = "Numéro d'agence est requis";
    }
    if (!this.formData.agencyName || (typeof this.formData.agencyName === 'string' && !this.formData.agencyName.trim())) {
      newErrors['agencyName'] = "Nom de l'agence est requis";
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
