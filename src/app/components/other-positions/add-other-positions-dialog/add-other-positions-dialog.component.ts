import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { OtherPositionRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-add-other-positions-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-other-positions-dialog.component.html',
  styleUrl: './add-other-positions-dialog.component.css'
})
export class AddOtherPositionDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<OtherPositionRequest>();

  formData: OtherPositionRequest = {
    positionName: '',
    positionType: '',
    description: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      positionName: '',
      positionType: '',
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
    if (!this.formData.positionName || !this.formData.positionName.trim()) {
      newErrors['positionName'] = 'Le nom de l\'autre poste est requis';
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
