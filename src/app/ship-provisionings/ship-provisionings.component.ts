import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ShipProvisioningsService } from '../services/ship-provisionings/ship-provisionings.service';
import { ShipProvisioning } from '../models/Maritime';

@Component({
  selector: 'app-ship-provisionings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './ship-provisionings.component.html',
  styleUrl: './ship-provisionings.component.css'
})
export class ShipProvisioningsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  provisionings: ShipProvisioning[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private shipProvisioningsService: ShipProvisioningsService) {}

  ngOnInit() {
    this.loadShipProvisioningss();
  }

  loadShipProvisioningss() {
    this.isLoading = true;
    this.shipProvisioningsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.provisionings = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading provisionings:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredShipProvisioningss() {
    if (!this.searchTerm) return this.provisionings;
    const term = this.searchTerm.toLowerCase();
    return this.provisionings.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  openAddDialog(): void {
    alert('La fonctionnalité d\'ajout de avitaillement de navire sera bientôt disponible. Le dialog d\'ajout doit être créé.');
    console.log('TODO: Créer le dialog d\'ajout pour avitaillement de navire');
  }
}
