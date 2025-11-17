import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { EscortMissionsService } from '../services/escort-missions/escort-missions.service';
import { EscortMission } from '../models/Maritime';

@Component({
  selector: 'app-escort-missions',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './escort-missions.component.html',
  styleUrl: './escort-missions.component.css'
})
export class EscortMissionsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  missions: EscortMission[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private escortMissionsService: EscortMissionsService) {}

  ngOnInit() {
    this.loadEscortMissionss();
  }

  loadEscortMissionss() {
    this.isLoading = true;
    this.escortMissionsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.missions = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading missions:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredEscortMissionss() {
    if (!this.searchTerm) return this.missions;
    const term = this.searchTerm.toLowerCase();
    return this.missions.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }
}
