import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ServicePosition, ServicePositionRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-edit-service-positions-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-service-positions-dialog.component.html',
  styleUrl: './edit-service-positions-dialog.component.css'
})
export class EditServicePositionDialogComponent implements OnChanges {
  readonly X = X;

  @Input() servicePosition: ServicePosition | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ServicePositionRequest>();

  formData: ServicePositionRequest = {
    positionName: '',
    positionType: '',
    location: '',
    unit: '',
    description: ''
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['servicePosition'] && this.servicePosition) {
      this.formData = {
        positionName: this.servicePosition.positionName || '',
        positionType: this.servicePosition.positionType || '',
        location: this.servicePosition.location || '',
        unit: this.servicePosition.unit || '',
        description: this.servicePosition.description || ''
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      positionName: '',
      positionType: '',
      location: '',
      unit: '',
      description: ''
    };
    this.errors = {};
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
      this.save.emit(this.formData);
      this.handleClose();
    }
  }
}
