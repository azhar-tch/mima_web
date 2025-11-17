import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { AgentGradeHistoryService } from '../services/agent-grade-history/agent-grade-history.service';
import { AgentGradeHistory } from '../models/HRManagement';

@Component({
  selector: 'app-agent-grade-history',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './agent-grade-history.component.html',
  styleUrl: './agent-grade-history.component.css'
})
export class AgentGradeHistoryComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  gradeHistory: AgentGradeHistory[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private agentGradeHistoryService: AgentGradeHistoryService) {}

  ngOnInit() {
    this.loadAgentGradeHistorys();
  }

  loadAgentGradeHistorys() {
    this.isLoading = true;
    this.agentGradeHistoryService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.gradeHistory = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading gradeHistory:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredAgentGradeHistorys() {
    if (!this.searchTerm) return this.gradeHistory;
    const term = this.searchTerm.toLowerCase();
    return this.gradeHistory.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
