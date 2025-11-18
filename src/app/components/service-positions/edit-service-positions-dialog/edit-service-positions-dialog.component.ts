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
    description: '',
    hierarchyLevel: undefined
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['servicePosition'] && this.servicePosition) {
      this.formData = {
        positionName: this.servicePosition.positionName || '',
        description: this.servicePosition.description || '',
        hierarchyLevel: this.servicePosition.hierarchyLevel
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      positionName: '',
      description: '',
      hierarchyLevel: undefined
    };
    this.errors = {};
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.positionName || !this.formData.positionName.trim()) {
      newErrors['positionName'] = 'Le nom du service-positions est requis';
    }
    if (this.formData.hierarchyLevel !== undefined && this.formData.hierarchyLevel < 0) {
      newErrors['hierarchyLevel'] = 'Le niveau hiérarchique doit être positif';
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
