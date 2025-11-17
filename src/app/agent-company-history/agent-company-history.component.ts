import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { AgentCompanyHistoryService } from '../services/agent-company-history/agent-company-history.service';
import { AgentCompanyHistory } from '../models/HRManagement';

@Component({
  selector: 'app-agent-company-history',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './agent-company-history.component.html',
  styleUrl: './agent-company-history.component.css'
})
export class AgentCompanyHistoryComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  companyHistory: AgentCompanyHistory[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private agentCompanyHistoryService: AgentCompanyHistoryService) {}

  ngOnInit() {
    this.loadAgentCompanyHistorys();
  }

  loadAgentCompanyHistorys() {
    this.isLoading = true;
    this.agentCompanyHistoryService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.companyHistory = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading companyHistory:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredAgentCompanyHistorys() {
    if (!this.searchTerm) return this.companyHistory;
    const term = this.searchTerm.toLowerCase();
    return this.companyHistory.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
