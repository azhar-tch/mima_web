import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { AgentAwardHistoryService } from '../services/agent-award-history/agent-award-history.service';
import { AgentAwardHistory } from '../models/HRManagement';

@Component({
  selector: 'app-agent-award-history',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './agent-award-history.component.html',
  styleUrl: './agent-award-history.component.css'
})
export class AgentAwardHistoryComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  awardHistory: AgentAwardHistory[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private agentAwardHistoryService: AgentAwardHistoryService) {}

  ngOnInit() {
    this.loadAgentAwardHistorys();
  }

  loadAgentAwardHistorys() {
    this.isLoading = true;
    this.agentAwardHistoryService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.awardHistory = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading awardHistory:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredAgentAwardHistorys() {
    if (!this.searchTerm) return this.awardHistory;
    const term = this.searchTerm.toLowerCase();
    return this.awardHistory.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
