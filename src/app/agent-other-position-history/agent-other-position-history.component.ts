import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { AgentOtherPositionHistoryService } from '../services/agent-other-position-history/agent-other-position-history.service';
import { AgentOtherPositionHistory } from '../models/HRManagement';

@Component({
  selector: 'app-agent-other-position-history',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './agent-other-position-history.component.html',
  styleUrl: './agent-other-position-history.component.css'
})
export class AgentOtherPositionHistoryComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  positionHistory: AgentOtherPositionHistory[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private agentOtherPositionHistoryService: AgentOtherPositionHistoryService) {}

  ngOnInit() {
    this.loadAgentOtherPositionHistorys();
  }

  loadAgentOtherPositionHistorys() {
    this.isLoading = true;
    this.agentOtherPositionHistoryService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.positionHistory = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading positionHistory:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredAgentOtherPositionHistorys() {
    if (!this.searchTerm) return this.positionHistory;
    const term = this.searchTerm.toLowerCase();
    return this.positionHistory.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  openAddDialog(): void {
    alert('La fonctionnalité d\'ajout de historique de poste sera bientôt disponible. Le dialog d\'ajout doit être créé.');
    console.log('TODO: Créer le dialog d\'ajout pour historique de poste');
  }
}
