import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { AwardRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-add-award-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-award-dialog.component.html',
  styleUrl: './add-award-dialog.component.css'
})
export class AddAwardDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<AwardRequest>();

  formData: AwardRequest = {
    awardName: '',
    awardType: '',
    description: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      awardName: '',
      awardType: '',
      description: ''
    };
    this.errors = {};
  }

  handleClose() {
    this.close.emit();
    this.handleReset();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.awardName || !this.formData.awardName.trim()) {
      newErrors['awardName'] = 'Le nom de la distinction est requis';
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
