import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { HRGrade, HRGradeRequest } from '../../models/HRManagement';

@Component({
  selector: 'app-edit-grade-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-grade-dialog.component.html',
  styleUrl: './edit-grade-dialog.component.css'
})
export class EditGradeDialogComponent implements OnChanges {
  readonly X = X;

  @Input() grade: HRGrade | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<HRGradeRequest>();

  formData: HRGradeRequest = {
    gradeName: '',
    description: '',
    hierarchyLevel: undefined
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['grade'] && this.grade) {
      this.formData = {
        gradeName: this.grade.gradeName || '',
        description: this.grade.description || '',
        hierarchyLevel: this.grade.hierarchyLevel
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      gradeName: '',
      description: '',
      hierarchyLevel: undefined
    };
    this.errors = {};
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.gradeName || !this.formData.gradeName.trim()) {
      newErrors['gradeName'] = 'Le nom du grade est requis';
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
