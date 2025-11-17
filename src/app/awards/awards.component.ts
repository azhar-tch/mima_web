import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { AwardsService } from '../services/awards/awards.service';
import { Award } from '../models/HRManagement';

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.css'
})
export class AwardsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  awards: Award[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private awardsService: AwardsService) {}

  ngOnInit() {
    this.loadAwardss();
  }

  loadAwardss() {
    this.isLoading = true;
    this.awardsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.awards = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading awards:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredAwardss() {
    if (!this.searchTerm) return this.awards;
    const term = this.searchTerm.toLowerCase();
    return this.awards.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
