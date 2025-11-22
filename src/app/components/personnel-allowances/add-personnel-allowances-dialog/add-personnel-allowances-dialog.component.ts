import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { PersonnelAllowanceRequest } from '../../../models/Maritime';
import { MaritimeRank } from '../../../models/enums';

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

  // Maritime Ranks enum values and display names
  maritimeRanks = [
    { value: MaritimeRank.CAPITAINE, label: 'Capitaine' },
    { value: MaritimeRank.COMMANDANT, label: 'Commandant' },
    { value: MaritimeRank.LIEUTENANT, label: 'Lieutenant' },
    { value: MaritimeRank.ENSEIGNE, label: 'Enseigne' },
    { value: MaritimeRank.MAITRE_PRINCIPAL, label: 'Maître Principal' },
    { value: MaritimeRank.PREMIER_MAITRE, label: 'Premier Maître' },
    { value: MaritimeRank.MAITRE, label: 'Maître' },
    { value: MaritimeRank.SECOND_MAITRE, label: 'Second Maître' },
    { value: MaritimeRank.QUARTIER_MAITRE_1ERE_CLASSE, label: 'Quartier-Maître 1ère Classe' },
    { value: MaritimeRank.QUARTIER_MAITRE_2EME_CLASSE, label: 'Quartier-Maître 2ème Classe' },
    { value: MaritimeRank.MATELOT_BREVETE, label: 'Matelot Breveté' },
    { value: MaritimeRank.MATELOT, label: 'Matelot' }
  ];

  formData: PersonnelAllowanceRequest = {
    rankCode: '',
    maritimeRank: '',
    escortDailyAllowance: undefined,
    armedGuardDailyAllowance: undefined,
    patrolAllowance: undefined,
    riskAllowance: undefined,
    seaAllowance: undefined,
    currency: '',
    observations: ''
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
      observations: ''
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
