import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ShipIncidentsService } from '../services/ship-incidents/ship-incidents.service';
import { ShipIncident } from '../models/Maritime';

@Component({
  selector: 'app-ship-incidents',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './ship-incidents.component.html',
  styleUrl: './ship-incidents.component.css'
})
export class ShipIncidentsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  incidents: ShipIncident[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private shipIncidentsService: ShipIncidentsService) {}

  ngOnInit() {
    this.loadShipIncidentss();
  }

  loadShipIncidentss() {
    this.isLoading = true;
    this.shipIncidentsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.incidents = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading incidents:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredShipIncidentss() {
    if (!this.searchTerm) return this.incidents;
    const term = this.searchTerm.toLowerCase();
    return this.incidents.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  openAddDialog(): void {
    alert('La fonctionnalité d\'ajout de incident de navire sera bientôt disponible. Le dialog d\'ajout doit être créé.');
    console.log('TODO: Créer le dialog d\'ajout pour incident de navire');
  }
}
