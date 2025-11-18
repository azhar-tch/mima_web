import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { Training, TrainingRequest } from '../../models/HRManagement';

@Component({
  selector: 'app-edit-training-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-training-dialog.component.html',
  styleUrl: './edit-training-dialog.component.css'
})
export class EditTrainingDialogComponent implements OnChanges {
  readonly X = X;

  @Input() trainings: Training | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<TrainingRequest>();

  formData: TrainingRequest = {
    trainingName: '',
    description: '',
    hierarchyLevel: undefined
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['trainings'] && this.trainings) {
      this.formData = {
        trainingName: this.trainings.trainingName || '',
        description: this.trainings.description || '',
        hierarchyLevel: this.trainings.hierarchyLevel
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      trainingName: '',
      description: '',
      hierarchyLevel: undefined
    };
    this.errors = {};
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.trainingName || !this.formData.trainingName.trim()) {
      newErrors['trainingName'] = 'Le nom du trainings est requis';
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
