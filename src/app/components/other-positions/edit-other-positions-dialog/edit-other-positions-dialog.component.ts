import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { OtherPosition, OtherPositionRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-edit-other-positions-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-other-positions-dialog.component.html',
  styleUrl: './edit-other-positions-dialog.component.css'
})
export class EditOtherPositionDialogComponent implements OnChanges {
  readonly X = X;

  @Input() other-positions: OtherPosition | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<OtherPositionRequest>();

  formData: OtherPositionRequest = {
    positionName: '',
    description: '',
    hierarchyLevel: undefined
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['other-positions'] && this.other-positions) {
      this.formData = {
        positionName: this.other-positions.positionName || '',
        description: this.other-positions.description || '',
        hierarchyLevel: this.other-positions.hierarchyLevel
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      positionName: '',
      description: '',
      hierarchyLevel: undefined
    };
    this.errors = {};
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.positionName || !this.formData.positionName.trim()) {
      newErrors['positionName'] = 'Le nom du other-positions est requis';
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
