import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { Award, AwardRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-edit-award-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-award-dialog.component.html',
  styleUrl: './edit-award-dialog.component.css'
})
export class EditAwardDialogComponent implements OnChanges {
  readonly X = X;

  @Input() awards: Award | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<AwardRequest>();

  formData: AwardRequest = {
    awardName: '',
    description: '',
    hierarchyLevel: undefined
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['awards'] && this.awards) {
      this.formData = {
        awardName: this.awards.awardName || '',
        description: this.awards.description || '',
        hierarchyLevel: this.awards.hierarchyLevel
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      awardName: '',
      description: '',
      hierarchyLevel: undefined
    };
    this.errors = {};
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.awardName || !this.formData.awardName.trim()) {
      newErrors['awardName'] = 'Le nom du awards est requis';
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
