import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { CommercialShipsService } from '../services/commercial-ships/commercial-ships.service';
import { CommercialShip } from '../models/Maritime';

@Component({
  selector: 'app-commercial-ships',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './commercial-ships.component.html',
  styleUrl: './commercial-ships.component.css'
})
export class CommercialShipsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  ships: CommercialShip[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private commercialShipsService: CommercialShipsService) {}

  ngOnInit() {
    this.loadCommercialShipss();
  }

  loadCommercialShipss() {
    this.isLoading = true;
    this.commercialShipsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.ships = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading ships:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredCommercialShipss() {
    if (!this.searchTerm) return this.ships;
    const term = this.searchTerm.toLowerCase();
    return this.ships.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  openAddDialog(): void {
    alert('La fonctionnalité d\'ajout de navire commercial sera bientôt disponible. Le dialog d\'ajout doit être créé.');
    console.log('TODO: Créer le dialog d\'ajout pour navire commercial');
  }
}
