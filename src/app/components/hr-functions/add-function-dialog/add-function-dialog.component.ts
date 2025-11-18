import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { HRFunctionRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-add-function-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-function-dialog.component.html',
  styleUrl: './add-function-dialog.component.css'
})
export class AddFunctionDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<HRFunctionRequest>();

  formData: HRFunctionRequest = {
    functionName: '',
    description: '',
    department: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      functionName: '',
      description: '',
      department: ''
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
      newErrors['functionName'] = 'Le nom de la fonction est requis';
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
