import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { SecurityAgenciesService } from '../services/security-agencies/security-agencies.service';
import { SecurityAgency } from '../models/Maritime';

@Component({
  selector: 'app-security-agencies',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './security-agencies.component.html',
  styleUrl: './security-agencies.component.css'
})
export class SecurityAgenciesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  agencies: SecurityAgency[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private securityAgenciesService: SecurityAgenciesService) {}

  ngOnInit() {
    this.loadSecurityAgenciess();
  }

  loadSecurityAgenciess() {
    this.isLoading = true;
    this.securityAgenciesService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.agencies = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading agencies:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredSecurityAgenciess() {
    if (!this.searchTerm) return this.agencies;
    const term = this.searchTerm.toLowerCase();
    return this.agencies.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
