import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { PALEntryExitsService } from '../services/pal-entry-exits/pal-entry-exits.service';
import { PALEntryExit } from '../models/Maritime';

@Component({
  selector: 'app-pal-entry-exits',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './pal-entry-exits.component.html',
  styleUrl: './pal-entry-exits.component.css'
})
export class PalEntryExitsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  entries: PALEntryExit[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private palEntryExitsService: PALEntryExitsService) {}

  ngOnInit() {
    this.loadPalEntryExitss();
  }

  loadPalEntryExitss() {
    this.isLoading = true;
    this.palEntryExitsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.entries = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading entries:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredPalEntryExitss() {
    if (!this.searchTerm) return this.entries;
    const term = this.searchTerm.toLowerCase();
    return this.entries.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
