import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { OtherPositionsService } from '../services/other-positions/other-positions.service';
import { OtherPosition } from '../models/HRManagement';

@Component({
  selector: 'app-other-positions',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './other-positions.component.html',
  styleUrl: './other-positions.component.css'
})
export class OtherPositionsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  positions: OtherPosition[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private otherPositionsService: OtherPositionsService) {}

  ngOnInit() {
    this.loadOtherPositionss();
  }

  loadOtherPositionss() {
    this.isLoading = true;
    this.otherPositionsService.list().subscribe({
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

  get filteredOtherPositionss() {
    if (!this.searchTerm) return this.positions;
    const term = this.searchTerm.toLowerCase();
    return this.positions.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
