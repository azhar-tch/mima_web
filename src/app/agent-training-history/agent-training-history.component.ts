import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { AgentTrainingHistoryService } from '../services/agent-training-history/agent-training-history.service';
import { AgentTrainingHistory } from '../models/HRManagement';

@Component({
  selector: 'app-agent-training-history',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './agent-training-history.component.html',
  styleUrl: './agent-training-history.component.css'
})
export class AgentTrainingHistoryComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  trainingHistory: AgentTrainingHistory[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private agentTrainingHistoryService: AgentTrainingHistoryService) {}

  ngOnInit() {
    this.loadAgentTrainingHistorys();
  }

  loadAgentTrainingHistorys() {
    this.isLoading = true;
    this.agentTrainingHistoryService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.trainingHistory = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading trainingHistory:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredAgentTrainingHistorys() {
    if (!this.searchTerm) return this.trainingHistory;
    const term = this.searchTerm.toLowerCase();
    return this.trainingHistory.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  openAddDialog(): void {
    alert('La fonctionnalité d\'ajout de historique de formation sera bientôt disponible. Le dialog d\'ajout doit être créé.');
    console.log('TODO: Créer le dialog d\'ajout pour historique de formation');
  }
}
