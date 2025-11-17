import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ServicePositionsService } from '../services/service-positions/service-positions.service';
import { ServicePosition } from '../models/HRManagement';

@Component({
  selector: 'app-service-positions',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './service-positions.component.html',
  styleUrl: './service-positions.component.css'
})
export class ServicePositionsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  positions: ServicePosition[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private servicePositionsService: ServicePositionsService) {}

  ngOnInit() {
    this.loadServicePositionss();
  }

  loadServicePositionss() {
    this.isLoading = true;
    this.servicePositionsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.positions = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading positions:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredServicePositionss() {
    if (!this.searchTerm) return this.positions;
    const term = this.searchTerm.toLowerCase();
    return this.positions.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
