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
    trainingType: '',
    description: '',
    institution: '',
    country: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      trainingName: '',
      trainingType: '',
      description: '',
      institution: '',
      country: ''
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
      newErrors['trainingName'] = 'Le nom de la formation est requis';
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
