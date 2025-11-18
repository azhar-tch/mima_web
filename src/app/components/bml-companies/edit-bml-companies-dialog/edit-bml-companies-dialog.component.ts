import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { BMLCompany, BMLCompanyRequest } from '../../../models/HRManagement';

@Component({
  selector: 'app-edit-bml-companies-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-bml-companies-dialog.component.html',
  styleUrl: './edit-bml-companies-dialog.component.css'
})
export class EditBmlCompanyDialogComponent implements OnChanges {
  readonly X = X;

  @Input() bmlCompany: BMLCompany | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<BMLCompanyRequest>();

  formData: BMLCompanyRequest = {
    companyName: '',
    gradeName: '',
    hierarchyLevel: undefined,
    description: ''
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bmlCompany'] && this.bmlCompany) {
      this.formData = {
        companyName: this.bmlCompany.companyName || '',
        gradeName: this.bmlCompany.gradeName || '',
        hierarchyLevel: this.bmlCompany.hierarchyLevel,
        description: this.bmlCompany.description || ''
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      companyName: '',
      gradeName: '',
      hierarchyLevel: undefined,
      description: ''
    };
    this.errors = {};
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.companyName || !this.formData.companyName.trim()) {
      newErrors['companyName'] = 'Le nom du bml-companies est requis';
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
