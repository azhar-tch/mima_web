import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { PALEntryExitRequest } from '../../../models/Maritime';

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
    commercialShipTrackingId: '',
    entryDate: '',
    anchorageZone: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
    commercialShipTrackingId: '',
    entryDate: '',
    anchorageZone: '',
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
      newErrors['commercialShipTrackingId'] = "ID Navire commercial est requis";
    }
    if (!this.formData.entryDate || (typeof this.formData.entryDate === 'string' && !this.formData.entryDate.trim())) {
      newErrors['entryDate'] = "Date d'entrée est requis";
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
