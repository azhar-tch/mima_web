import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { TrainingRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-add-training-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-training-dialog.component.html',
  styleUrl: './add-training-dialog.component.css'
})
export class AddTrainingDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<TrainingRequest>();

  formData: TrainingRequest = {
    trainingName: '',
    description: '',
    hierarchyLevel: undefined
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      trainingName: '',
      description: '',
      hierarchyLevel: undefined
    };
    this.errors = {};
  }

  handleClose() {
    this.close.emit();
    this.handleReset();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.trainingName || !this.formData.trainingName.trim()) {
      newErrors['trainingName'] = 'une formation est requis';
    }
    if (this.formData.hierarchyLevel !== undefined && this.formData.hierarchyLevel < 0) {
      newErrors['hierarchyLevel'] = 'Le niveau hiérarchique doit être positif';
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
