import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ArmedGuardMissionsService } from '../services/armed-guard-missions/armed-guard-missions.service';
import { ArmedGuardMission } from '../models/Maritime';

@Component({
  selector: 'app-armed-guard-missions',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './armed-guard-missions.component.html',
  styleUrl: './armed-guard-missions.component.css'
})
export class ArmedGuardMissionsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  missions: ArmedGuardMission[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private armedGuardMissionsService: ArmedGuardMissionsService) {}

  ngOnInit() {
    this.loadArmedGuardMissionss();
  }

  loadArmedGuardMissionss() {
    this.isLoading = true;
    this.armedGuardMissionsService.list().subscribe({
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

  get filteredArmedGuardMissionss() {
    if (!this.searchTerm) return this.missions;
    const term = this.searchTerm.toLowerCase();
    return this.missions.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  openAddDialog(): void {
    alert('La fonctionnalité d\'ajout de mission de garde armée sera bientôt disponible. Le dialog d\'ajout doit être créé.');
    console.log('TODO: Créer le dialog d\'ajout pour mission de garde armée');
  }
}
