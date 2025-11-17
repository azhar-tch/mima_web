import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { StsOperationsService } from '../services/sts-operations/sts-operations.service';
import { STSOperation } from '../models/Maritime';

@Component({
  selector: 'app-sts-operations',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './sts-operations.component.html',
  styleUrl: './sts-operations.component.css'
})
export class StsOperationsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  operations: STSOperation[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private stsOperationsService: StsOperationsService) {}

  ngOnInit() {
    this.loadStsOperationss();
  }

  loadStsOperationss() {
    this.isLoading = true;
    this.stsOperationsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.operations = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading operations:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredStsOperationss() {
    if (!this.searchTerm) return this.operations;
    const term = this.searchTerm.toLowerCase();
    return this.operations.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
