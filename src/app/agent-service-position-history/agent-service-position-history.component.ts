import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { AgentServicePositionHistoryService } from '../services/agent-service-position-history/agent-service-position-history.service';
import { AgentServicePositionHistory } from '../models/HRManagement';

@Component({
  selector: 'app-agent-service-position-history',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './agent-service-position-history.component.html',
  styleUrl: './agent-service-position-history.component.css'
})
export class AgentServicePositionHistoryComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  positionHistory: AgentServicePositionHistory[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private agentServicePositionHistoryService: AgentServicePositionHistoryService) {}

  ngOnInit() {
    this.loadAgentServicePositionHistorys();
  }

  loadAgentServicePositionHistorys() {
    this.isLoading = true;
    this.agentServicePositionHistoryService.list().subscribe({
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

  get filteredAgentServicePositionHistorys() {
    if (!this.searchTerm) return this.positionHistory;
    const term = this.searchTerm.toLowerCase();
    return this.positionHistory.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
