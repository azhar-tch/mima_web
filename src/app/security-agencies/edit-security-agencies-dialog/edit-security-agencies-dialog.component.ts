import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { SecurityAgency, SecurityAgencyRequest } from '../../models/Maritime';

@Component({
  selector: 'app-edit-security-agencies-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-security-agencies-dialog.component.html',
  styleUrl: './edit-security-agencies-dialog.component.css'
})
export class EditSecurityAgenciesDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: SecurityAgency;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<SecurityAgencyRequest>();

  formData: SecurityAgencyRequest = {} as SecurityAgencyRequest;
  errors: Record<string, string> = {};

  ngOnInit() {
    // Copier les données de l'item dans formData
    this.formData = { ...this.item } as any;
  }

  handleClose() {
    this.close.emit();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    // Ajoutez vos validations ici
    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.save.emit(this.formData);
    }
  }
}
