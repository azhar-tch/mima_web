import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { PersonnelAllowanceRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-add-personnel-allowances-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-personnel-allowances-dialog.component.html',
  styleUrl: './add-personnel-allowances-dialog.component.css'
})
export class AddPersonnelAllowancesDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<PersonnelAllowanceRequest>();

  formData: PersonnelAllowanceRequest = {
    rankCode: '',
    maritimeRank: '',
    escortDailyAllowance: undefined,
    armedGuardDailyAllowance: undefined,
    patrolAllowance: undefined,
    riskAllowance: undefined,
    seaAllowance: undefined,
    currency: '',
    observations: '',
    isActive: undefined
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      rankCode: '',
      maritimeRank: '',
      escortDailyAllowance: undefined,
      armedGuardDailyAllowance: undefined,
      patrolAllowance: undefined,
      riskAllowance: undefined,
      seaAllowance: undefined,
      currency: '',
      observations: '',
      isActive: undefined
    };
    this.errors = {};
  }

  handleClose() {
    this.close.emit();
    this.handleReset();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.rankCode || (typeof this.formData.rankCode === 'string' && !this.formData.rankCode.trim())) {
      newErrors['rankCode'] = 'Code de grade est requis';
    }
    if (!this.formData.maritimeRank || (typeof this.formData.maritimeRank === 'string' && !this.formData.maritimeRank.trim())) {
      newErrors['maritimeRank'] = 'Grade maritime est requis';
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
