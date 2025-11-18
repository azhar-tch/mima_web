import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { Award, AwardRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-edit-award-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-award-dialog.component.html',
  styleUrl: './edit-award-dialog.component.css'
})
export class EditAwardDialogComponent implements OnChanges {
  readonly X = X;

  @Input() award: Award | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<AwardRequest>();

  formData: AwardRequest = {
    awardName: '',
    awardType: '',
    description: ''
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['award'] && this.award) {
      this.formData = {
        awardName: this.award.awardName || '',
        awardType: this.award.awardType || '',
        description: this.award.description || ''
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      awardName: '',
      awardType: '',
      description: ''
    };
    this.errors = {};
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
      this.save.emit(this.formData);
      this.handleClose();
    }
  }
}
