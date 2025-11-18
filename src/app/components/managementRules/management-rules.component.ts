import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Edit, Trash2, Check, X } from 'lucide-angular';
import { ManagementRulesService } from '../../services/managementRules/management-rules.service';
import { ManagementRulesRequest, ManagementRulesResponse } from '../../models/ManagementRules';

@Component({
  selector: 'app-management-rules',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './management-rules.component.html',
  styleUrl: './management-rules.component.css'
})
export class ManagementRulesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Check = Check;
  readonly X = X;

  rules: ManagementRulesResponse[] = [];
  selectedRule: ManagementRulesResponse | null = null;
  showAddDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;

  formData: ManagementRulesRequest = this.getEmptyForm();

  errors: Record<string, string> = {};

  constructor(private managementRulesService: ManagementRulesService) {}

  ngOnInit(): void {
    this.loadRules();
  }

  loadRules() {
    this.managementRulesService.listRules().subscribe({
      next: (res) => {
        this.rules = res.data || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des règles', err);
        alert('Erreur lors du chargement des règles');
      }
    });
  }

  getEmptyForm(): ManagementRulesRequest {
    return {
      ruleName: '',
      preventDoubleAssignment: true,
      minRestHours: 12,
      maxWeeklyHours: 48,
      autoReportUnjustifiedAbsences: true,
      enforceEquityDistribution: true,
      description: ''
    };
  }

  openAddDialog() {
    this.formData = this.getEmptyForm();
    this.errors = {};
    this.showAddDialog = true;
  }

  openEditDialog(rule: ManagementRulesResponse) {
    this.selectedRule = rule;
    this.formData = {
      ruleName: rule.ruleName,
      preventDoubleAssignment: rule.preventDoubleAssignment,
      minRestHours: rule.minRestHours,
      maxWeeklyHours: rule.maxWeeklyHours,
      autoReportUnjustifiedAbsences: rule.autoReportUnjustifiedAbsences,
      enforceEquityDistribution: rule.enforceEquityDistribution,
      description: rule.description || ''
    };
    this.errors = {};
    this.showEditDialog = true;
  }

  openDeleteDialog(rule: ManagementRulesResponse) {
    this.selectedRule = rule;
    this.showDeleteDialog = true;
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!this.formData.ruleName?.trim()) {
      newErrors['ruleName'] = 'Le nom de la règle est requis';
    }

    if (this.formData.minRestHours < 0) {
      newErrors['minRestHours'] = 'Le repos minimal doit être positif';
    }

    if (this.formData.maxWeeklyHours < 1) {
      newErrors['maxWeeklyHours'] = 'Les heures hebdomadaires doivent être positives';
    }

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleAdd() {
    if (!this.validateForm()) return;

    console.log('Données envoyées:', JSON.stringify(this.formData, null, 2));

    this.managementRulesService.createRule(this.formData).subscribe({
      next: (res) => {
        if (res.data) {
          this.rules.push(res.data);
        }
        this.showAddDialog = false;
        alert('Règle créée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        console.error('Détails de l\'erreur:', err.error);
        if (err.error && err.error.message) {
          alert('Erreur: ' + err.error.message);
        } else {
          alert('Erreur lors de la création de la règle');
        }
      }
    });
  }

  handleEdit() {
    if (!this.selectedRule || !this.validateForm()) return;

    this.managementRulesService.updateRule(this.selectedRule.trackingId, this.formData).subscribe({
      next: (res) => {
        if (res.data) {
          const index = this.rules.findIndex(r => r.trackingId === res.data!.trackingId);
          if (index !== -1) {
            this.rules[index] = res.data;
          }
        }
        this.showEditDialog = false;
        this.selectedRule = null;
        alert('Règle mise à jour avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
        alert('Erreur lors de la mise à jour de la règle');
      }
    });
  }

  handleDelete() {
    if (!this.selectedRule) return;

    this.managementRulesService.deleteRule(this.selectedRule.trackingId).subscribe({
      next: () => {
        this.rules = this.rules.filter(r => r.trackingId !== this.selectedRule!.trackingId);
        this.showDeleteDialog = false;
        this.selectedRule = null;
        alert('Règle supprimée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de la règle');
      }
    });
  }

  closeDialogs() {
    this.showAddDialog = false;
    this.showEditDialog = false;
    this.showDeleteDialog = false;
    this.selectedRule = null;
    this.errors = {};
  }

  formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
