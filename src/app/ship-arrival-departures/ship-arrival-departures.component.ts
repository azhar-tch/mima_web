import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ShipArrivalDeparturesService } from '../services/ship-arrival-departures/ship-arrival-departures.service';
import { ShipArrivalDeparture } from '../models/Maritime';

@Component({
  selector: 'app-ship-arrival-departures',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './ship-arrival-departures.component.html',
  styleUrl: './ship-arrival-departures.component.css'
})
export class ShipArrivalDeparturesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  arrivals: ShipArrivalDeparture[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private shipArrivalDeparturesService: ShipArrivalDeparturesService) {}

  ngOnInit() {
    this.loadShipArrivalDeparturess();
  }

  loadShipArrivalDeparturess() {
    this.isLoading = true;
    this.shipArrivalDeparturesService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.arrivals = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading arrivals:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredShipArrivalDeparturess() {
    if (!this.searchTerm) return this.arrivals;
    const term = this.searchTerm.toLowerCase();
    return this.arrivals.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  openAddDialog(): void {
    alert('La fonctionnalité d\'ajout de arrivée/départ de navire sera bientôt disponible. Le dialog d\'ajout doit être créé.');
    console.log('TODO: Créer le dialog d\'ajout pour arrivée/départ de navire');
  }
}
