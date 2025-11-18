import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { Training, TrainingRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-edit-training-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-training-dialog.component.html',
  styleUrl: './edit-training-dialog.component.css'
})
export class EditTrainingDialogComponent implements OnChanges {
  readonly X = X;

  @Input() training: Training | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<TrainingRequest>();

  formData: TrainingRequest = {
    trainingName: '',
    trainingType: '',
    description: '',
    institution: '',
    country: ''
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['training'] && this.training) {
      this.formData = {
        trainingName: this.training.trainingName || '',
        trainingType: this.training.trainingType || '',
        description: this.training.description || '',
        institution: this.training.institution || '',
        country: this.training.country || ''
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      trainingName: '',
      trainingType: '',
      description: '',
      institution: '',
      country: ''
    };
    this.errors = {};
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
      this.save.emit(this.formData);
      this.handleClose();
    }
  }
}
