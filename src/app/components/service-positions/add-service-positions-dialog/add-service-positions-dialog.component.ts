import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ServicePositionRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-add-service-positions-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-service-positions-dialog.component.html',
  styleUrl: './add-service-positions-dialog.component.css'
})
export class AddServicePositionDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ServicePositionRequest>();

  formData: ServicePositionRequest = {
    positionName: '',
    positionType: '',
    location: '',
    unit: '',
    description: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      positionName: '',
      positionType: '',
      location: '',
      unit: '',
      description: ''
    };
    this.errors = {};
  }

  handleClose() {
    this.close.emit();
    this.handleReset();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.positionName || !this.formData.positionName.trim()) {
      newErrors['positionName'] = 'Le nom du poste de service est requis';
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
