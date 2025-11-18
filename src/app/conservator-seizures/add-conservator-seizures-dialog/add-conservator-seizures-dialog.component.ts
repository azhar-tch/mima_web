import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ConservatorSeizureRequest } from '../../models/Maritime';

@Component({
  selector: 'app-add-conservator-seizures-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-conservator-seizures-dialog.component.html',
  styleUrl: './add-conservator-seizures-dialog.component.css'
})
export class AddConservatorSeizuresDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ConservatorSeizureRequest>();

  formData: ConservatorSeizureRequest = {
    seizureNumber: '',
    dateTime: '',
    location: '',
    seizureDescription: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
    seizureNumber: '',
    dateTime: '',
    location: '',
    seizureDescription: '',
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
    if (!this.formData.seizureNumber || (typeof this.formData.seizureNumber === 'string' && !this.formData.seizureNumber.trim())) {
      newErrors['seizureNumber'] = 'Numéro de saisie est requis';
    }
    if (!this.formData.dateTime || (typeof this.formData.dateTime === 'string' && !this.formData.dateTime.trim())) {
      newErrors['dateTime'] = 'Date et heure est requis';
    }
    if (!this.formData.location || (typeof this.formData.location === 'string' && !this.formData.location.trim())) {
      newErrors['location'] = 'Localisation est requis';
    }
    if (!this.formData.seizureDescription || (typeof this.formData.seizureDescription === 'string' && !this.formData.seizureDescription.trim())) {
      newErrors['seizureDescription'] = 'Description de la saisie est requis';
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
