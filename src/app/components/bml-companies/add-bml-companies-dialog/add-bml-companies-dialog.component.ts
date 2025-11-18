import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { BMLCompanyRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-add-bml-companies-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-bml-companies-dialog.component.html',
  styleUrl: './add-bml-companies-dialog.component.css'
})
export class AddBmlCompanyDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<BMLCompanyRequest>();

  formData: BMLCompanyRequest = {
    companyName: '',
    description: '',
    hierarchyLevel: undefined
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      companyName: '',
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
    if (!this.formData.companyName || !this.formData.companyName.trim()) {
      newErrors['companyName'] = 'une compagnie BML est requis';
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
