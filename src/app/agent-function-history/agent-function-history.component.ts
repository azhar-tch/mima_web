import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { AgentFunctionHistoryService } from '../services/agent-function-history/agent-function-history.service';
import { AgentFunctionHistory } from '../models/HRManagement';

@Component({
  selector: 'app-agent-function-history',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './agent-function-history.component.html',
  styleUrl: './agent-function-history.component.css'
})
export class AgentFunctionHistoryComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  functionHistory: AgentFunctionHistory[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private agentFunctionHistoryService: AgentFunctionHistoryService) {}

  ngOnInit() {
    this.loadAgentFunctionHistorys();
  }

  loadAgentFunctionHistorys() {
    this.isLoading = true;
    this.agentFunctionHistoryService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.functionHistory = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading functionHistory:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredAgentFunctionHistorys() {
    if (!this.searchTerm) return this.functionHistory;
    const term = this.searchTerm.toLowerCase();
    return this.functionHistory.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
