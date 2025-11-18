import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { OtherPosition, OtherPositionRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-edit-other-positions-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-other-positions-dialog.component.html',
  styleUrl: './edit-other-positions-dialog.component.css'
})
export class EditOtherPositionDialogComponent implements OnChanges {
  readonly X = X;

  @Input() otherPosition: OtherPosition | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<OtherPositionRequest>();

  formData: OtherPositionRequest = {
    positionName: '',
    positionType: '',
    description: ''
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['otherPosition'] && this.otherPosition) {
      this.formData = {
        positionName: this.otherPosition.positionName || '',
        positionType: this.otherPosition.positionType || '',
        description: this.otherPosition.description || ''
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      positionName: '',
      positionType: '',
      description: ''
    };
    this.errors = {};
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.positionName || !this.formData.positionName.trim()) {
      newErrors['positionName'] = 'Le nom de l\'autre position est requis';
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
