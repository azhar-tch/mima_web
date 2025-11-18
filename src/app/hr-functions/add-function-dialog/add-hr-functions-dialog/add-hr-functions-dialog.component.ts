import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { HRFunctionRequest } from '../../models/HRManagement';

@Component({
  selector: 'app-add-hr-functions-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-hr-functions-dialog.component.html',
  styleUrl: './add-hr-functions-dialog.component.css'
})
export class AddHrFunctionDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<HRFunctionRequest>();

  formData: HRFunctionRequest = {
    functionName: '',
    description: '',
    hierarchyLevel: undefined
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      functionName: '',
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
    if (!this.formData.functionName || !this.formData.functionName.trim()) {
      newErrors['functionName'] = 'une fonction est requis';
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
