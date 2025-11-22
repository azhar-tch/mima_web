import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { PersonnelAllowance, PersonnelAllowanceRequest } from '../../../models/Maritime';
import { MaritimeRank } from '../../../models/enums';

@Component({
  selector: 'app-edit-personnel-allowances-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-personnel-allowances-dialog.component.html',
  styleUrl: './edit-personnel-allowances-dialog.component.css'
})
export class EditPersonnelAllowancesDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: PersonnelAllowance;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<PersonnelAllowanceRequest>();

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

  formData: PersonnelAllowanceRequest = {} as PersonnelAllowanceRequest;
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
