import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { HrFunctionsService } from '../services/hr-functions/hr-functions.service';
import { HRFunction } from '../models/HRManagement';

@Component({
  selector: 'app-hr-functions',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './hr-functions.component.html',
  styleUrl: './hr-functions.component.css'
})
export class HrFunctionsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  functions: HRFunction[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private hrFunctionsService: HrFunctionsService) {}

  ngOnInit() {
    this.loadHrFunctionss();
  }

  loadHrFunctionss() {
    this.isLoading = true;
    this.hrFunctionsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.functions = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading functions:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredHrFunctionss() {
    if (!this.searchTerm) return this.functions;
    const term = this.searchTerm.toLowerCase();
    return this.functions.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
