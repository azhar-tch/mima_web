import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { BmlCompaniesService } from '../services/bml-companies/bml-companies.service';
import { BMLCompany } from '../models/HRManagement';

@Component({
  selector: 'app-bml-companies',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './bml-companies.component.html',
  styleUrl: './bml-companies.component.css'
})
export class BmlCompaniesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  companies: BMLCompany[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private bmlCompaniesService: BmlCompaniesService) {}

  ngOnInit() {
    this.loadBmlCompaniess();
  }

  loadBmlCompaniess() {
    this.isLoading = true;
    this.bmlCompaniesService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.companies = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading companies:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredBmlCompaniess() {
    if (!this.searchTerm) return this.companies;
    const term = this.searchTerm.toLowerCase();
    return this.companies.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
