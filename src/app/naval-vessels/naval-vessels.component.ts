import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { NavalVesselsService } from '../services/naval-vessels/naval-vessels.service';
import { NavalVessel } from '../models/Maritime';

@Component({
  selector: 'app-naval-vessels',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './naval-vessels.component.html',
  styleUrl: './naval-vessels.component.css'
})
export class NavalVesselsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  vessels: NavalVessel[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private navalVesselsService: NavalVesselsService) {}

  ngOnInit() {
    this.loadNavalVesselss();
  }

  loadNavalVesselss() {
    this.isLoading = true;
    this.navalVesselsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.vessels = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading vessels:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredNavalVesselss() {
    if (!this.searchTerm) return this.vessels;
    const term = this.searchTerm.toLowerCase();
    return this.vessels.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
