import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Filter, FileText, User, Calendar } from 'lucide-angular';
import { HistoriesService } from '../../services/histories/histories.service';
import { HistoriesResponse } from '../../models/Histories';
import { ActionType } from '../../models/enums';

@Component({
  selector: 'app-histories',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './histories.component.html',
  styleUrl: './histories.component.css'
})
export class HistoriesComponent implements OnInit {
  readonly Search = Search;
  readonly Filter = Filter;
  readonly FileText = FileText;
  readonly User = User;
  readonly Calendar = Calendar;
  readonly ActionType = ActionType;

  histories: HistoriesResponse[] = [];
  searchTerm = '';
  entityFilter: 'all' | 'DUTY' | 'MISSION' | 'ABSENCE' | 'AGENT_GRADE' | 'AGENT_AWARD' | 'AGENT_TRAINING' | 'AGENT_FUNCTION' | 'AGENT_COMPANY' | 'AGENT_SERVICE_POSITION' | 'AGENT_OTHER_POSITION' = 'all';
  actionFilter: 'all' | ActionType = 'all';
  selectedHistory: HistoriesResponse | null = null;
  openDetailsDialog = false;

  constructor(private historiesService: HistoriesService) {}

  ngOnInit(): void {
    this.loadHistories();
  }

  loadHistories(): void {
    this.historiesService.listHistories().subscribe({
      next: (res) => {
        this.histories = res.data || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'historique', err);
        alert('Erreur lors du chargement de l\'historique');
      }
    });
  }

  get filteredHistories(): HistoriesResponse[] {
    return this.histories.filter((history) => {
      const matchesSearch =
        (history.agentName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
        (history.entityName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
        (history.changesSummary?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false);
      const matchesEntity = this.entityFilter === 'all' || history.entityName === this.entityFilter;
      const matchesAction = this.actionFilter === 'all' || history.actionType === this.actionFilter;
      return matchesSearch && matchesEntity && matchesAction;
    });
  }

  viewDetails(history: HistoriesResponse): void {
    this.selectedHistory = history;
    this.openDetailsDialog = true;
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getActionBadgeStyle(action: ActionType): string {
    switch (action) {
      case ActionType.CREATE: return 'bg-green-500 text-white';
      case ActionType.UPDATE: return 'bg-blue-500 text-white';
      case ActionType.DELETE: return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  }

  getEntityBadgeStyle(entity: string): string {
    switch (entity) {
      case 'DUTY': return 'bg-purple-500 text-white';
      case 'MISSION': return 'bg-indigo-500 text-white';
      case 'ABSENCE': return 'bg-orange-500 text-white';
      case 'AGENT_GRADE': return 'bg-emerald-500 text-white';
      case 'AGENT_AWARD': return 'bg-yellow-500 text-white';
      case 'AGENT_TRAINING': return 'bg-cyan-500 text-white';
      case 'AGENT_FUNCTION': return 'bg-teal-500 text-white';
      case 'AGENT_COMPANY': return 'bg-rose-500 text-white';
      case 'AGENT_SERVICE_POSITION': return 'bg-violet-500 text-white';
      case 'AGENT_OTHER_POSITION': return 'bg-fuchsia-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  }

  getActionLabel(action: ActionType): string {
    switch (action) {
      case ActionType.CREATE: return 'Création';
      case ActionType.UPDATE: return 'Modification';
      case ActionType.DELETE: return 'Suppression';
      default: return action;
    }
  }

  getEntityLabel(entity: string): string {
    switch (entity) {
      case 'DUTY': return 'Garde';
      case 'MISSION': return 'Mission';
      case 'ABSENCE': return 'Absence';
      case 'AGENT_GRADE': return 'Grade';
      case 'AGENT_AWARD': return 'Distinction';
      case 'AGENT_TRAINING': return 'Formation';
      case 'AGENT_FUNCTION': return 'Fonction';
      case 'AGENT_COMPANY': return 'Compagnie';
      case 'AGENT_SERVICE_POSITION': return 'Position Service';
      case 'AGENT_OTHER_POSITION': return 'Autre Position';
      default: return entity;
    }
  }

  getAgentInitials(name: string | undefined): string {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0].charAt(0) + parts[1].charAt(0);
    }
    return name.charAt(0);
  }
}
