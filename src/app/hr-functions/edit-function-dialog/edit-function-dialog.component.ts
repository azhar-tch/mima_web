import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { HRFunction, HRFunctionRequest } from '../../models/HRManagement';

@Component({
  selector: 'app-edit-function-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-hr-functions-dialog/edit-hr-functions-dialog.component.html',
  styleUrl: './edit-hr-functions-dialog/edit-hr-functions-dialog.component.css'
})
export class EditFunctionDialogComponent implements OnChanges {
  readonly X = X;

  @Input() hr: HRFunction | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<HRFunctionRequest>();

  formData: HRFunctionRequest = {
    functionName: '',
    description: '',
    hierarchyLevel: undefined
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hr'] && this.hr) {
      this.formData = {
        functionName: this.hr.functionName || '',
        description: this.hr.description || '',
        hierarchyLevel: this.hr.hierarchyLevel
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      functionName: '',
      description: '',
      hierarchyLevel: undefined
    };
    this.errors = {};
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.functionName || !this.formData.functionName.trim()) {
      newErrors['functionName'] = 'Le nom de la fonction est requis';
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
