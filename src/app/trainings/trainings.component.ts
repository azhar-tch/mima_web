import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { TrainingsService } from '../services/trainings/trainings.service';
import { Training } from '../models/HRManagement';

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css'
})
export class TrainingsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  trainings: Training[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private trainingsService: TrainingsService) {}

  ngOnInit() {
    this.loadTrainingss();
  }

  loadTrainingss() {
    this.isLoading = true;
    this.trainingsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.trainings = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading trainings:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredTrainingss() {
    if (!this.searchTerm) return this.trainings;
    const term = this.searchTerm.toLowerCase();
    return this.trainings.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
