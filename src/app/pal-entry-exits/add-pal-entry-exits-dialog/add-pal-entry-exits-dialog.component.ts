import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { PALEntryExitRequest } from '../../models/Maritime';

@Component({
  selector: 'app-add-pal-entry-exits-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-pal-entry-exits-dialog.component.html',
  styleUrl: './add-pal-entry-exits-dialog.component.css'
})
export class AddPalEntryExitsDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<PALEntryExitRequest>();

  formData: PALEntryExitRequest = {
    entryExitNumber: '',
    dateTime: '',
    palLocation: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
    entryExitNumber: '',
    dateTime: '',
    palLocation: '',
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
    if (!this.formData.entryExitNumber || (typeof this.formData.entryExitNumber === 'string' && !this.formData.entryExitNumber.trim())) {
      newErrors['entryExitNumber'] = 'Numéro d'entrée/sortie est requis';
    }
    if (!this.formData.dateTime || (typeof this.formData.dateTime === 'string' && !this.formData.dateTime.trim())) {
      newErrors['dateTime'] = 'Date et heure est requis';
    }
    if (!this.formData.palLocation || (typeof this.formData.palLocation === 'string' && !this.formData.palLocation.trim())) {
      newErrors['palLocation'] = 'Localisation PAL est requis';
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
