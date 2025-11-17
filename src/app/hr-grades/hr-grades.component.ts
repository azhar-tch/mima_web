import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { HrGradesService } from '../services/hr-grades/hr-grades.service';
import { HRGrade } from '../models/HRManagement';

@Component({
  selector: 'app-hr-grades',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './hr-grades.component.html',
  styleUrl: './hr-grades.component.css'
})
export class HrGradesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  grades: HRGrade[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private hrGradesService: HrGradesService) {}

  ngOnInit() {
    this.loadHrGradess();
  }

  loadHrGradess() {
    this.isLoading = true;
    this.hrGradesService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.grades = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading grades:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredHrGradess() {
    if (!this.searchTerm) return this.grades;
    const term = this.searchTerm.toLowerCase();
    return this.grades.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
