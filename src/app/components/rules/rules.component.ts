import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Pencil, Trash2 } from 'lucide-angular';
import { AddRulesDialogComponent } from './add-rules-dialog/add-rules-dialog.component';
import { EditRulesDialogComponent } from './edit-rules-dialog/edit-rules-dialog.component';
import { DeleteRulesConfirmationComponent } from './delete-rules-confirmation/delete-rules-confirmation.component';

export interface Rule {
  id: string;
  title: string;
  value: number;
  unit: string;
  description: string;
}

const SAMPLE_RULES: Rule[] = [
  {
    id: '1',
    title: 'Durée maximale de garde',
    value: 12,
    unit: 'heures',
    description: 'Durée maximale d\'une garde sans interruption',
  },
  {
    id: '2',
    title: 'Repos minimum entre gardes',
    value: 8,
    unit: 'heures',
    description: 'Temps de repos obligatoire entre deux gardes',
  },
  {
    id: '3',
    title: 'Jours de congés annuels',
    value: 25,
    unit: 'jours',
    description: 'Nombre de jours de congés annuels par agent',
  },
  {
    id: '4',
    title: 'Prime de nuit',
    value: 15,
    unit: '%',
    description: 'Majoration pour les heures travaillées la nuit',
  },
  {
    id: '5',
    title: 'Taux de présence minimum',
    value: 85,
    unit: '%',
    description: 'Pourcentage minimum de présence requis par mois',
  },
];

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddRulesDialogComponent,
    EditRulesDialogComponent,
    DeleteRulesConfirmationComponent
  ],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})
export class RulesComponent {
  readonly Plus = Plus;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;

  rules: Rule[] = [...SAMPLE_RULES];
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  selectedRule: Rule | null = null;

  handleAddRule(newRule: Omit<Rule, 'id'>): void {
    const rule: Rule = {
      ...newRule,
      id: Math.random().toString(36).substr(2, 9),
    };
    this.rules = [...this.rules, rule];
    this.openAddDialog = false;
  }

  handleEditRule(updatedRule: Rule): void {
    this.rules = this.rules.map((r) => (r.id === updatedRule.id ? updatedRule : r));
    this.openEditDialog = false;
    this.selectedRule = null;
  }

  handleDeleteRule(): void {
    if (this.selectedRule) {
      this.rules = this.rules.filter((r) => r.id !== this.selectedRule!.id);
      this.openDeleteDialog = false;
      this.selectedRule = null;
    }
  }

  handleEditAction(rule: Rule): void {
    this.selectedRule = rule;
    this.openEditDialog = true;
  }

  handleDeleteAction(rule: Rule): void {
    this.selectedRule = rule;
    this.openDeleteDialog = true;
  }
}
