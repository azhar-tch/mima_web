import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { BMLCompany, BMLCompanyRequest } from '../../models/HRManagement';

@Component({
  selector: 'app-edit-bml-companies-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-bml-companies-dialog.component.html',
  styleUrl: './edit-bml-companies-dialog.component.css'
})
export class EditBmlCompanyDialogComponent implements OnChanges {
  readonly X = X;

  @Input() bml-companies: BMLCompany | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<BMLCompanyRequest>();

  formData: BMLCompanyRequest = {
    companyName: '',
    description: '',
    hierarchyLevel: undefined
  };

  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bml-companies'] && this.bml-companies) {
      this.formData = {
        companyName: this.bml-companies.companyName || '',
        description: this.bml-companies.description || '',
        hierarchyLevel: this.bml-companies.hierarchyLevel
      };
    }
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      companyName: '',
      description: '',
      hierarchyLevel: undefined
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
