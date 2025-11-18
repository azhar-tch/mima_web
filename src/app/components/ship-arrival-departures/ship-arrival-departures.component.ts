import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ShipArrivalDeparturesService } from '../../services/ship-arrival-departures/ship-arrival-departures.service';
import { AddShipArrivalDeparturesDialogComponent } from './add-ship-arrival-departures-dialog/add-ship-arrival-departures-dialog.component';
import { EditShipArrivalDeparturesDialogComponent } from './edit-ship-arrival-departures-dialog/edit-ship-arrival-departures-dialog.component';
import { DeleteShipArrivalDeparturesDialogComponent } from './delete-ship-arrival-departures-dialog/delete-ship-arrival-departures-dialog.component';
import { ShipArrivalDeparture, ShipArrivalDepartureRequest } from '../../models/Maritime';

@Component({
  selector: 'app-ship-arrival-departures',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddShipArrivalDeparturesDialogComponent,
    EditShipArrivalDeparturesDialogComponent,
    DeleteShipArrivalDeparturesDialogComponent
  ],
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
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  selectedItem: ShipArrivalDeparture | null = null;

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

  showAddDialog(): void {
    this.openAddDialog = true;
  }
  handleAdd(newItem: ShipArrivalDepartureRequest): void {
    this.shipArrivalDeparturesService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.arrivals = [...this.arrivals, res.data];
        }
        this.openAddDialog = false;
        alert('arrivée/départ créé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de arrivée/départ');
      }
    });
  }
  showEditDialog(item: ShipArrivalDeparture): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: ShipArrivalDepartureRequest): void {
    if (!this.selectedItem) return;

    this.shipArrivalDeparturesService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.arrivals = this.arrivals.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert('arrivée/départ modifié(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de arrivée/départ');
      }
    });
  }

  showDeleteDialog(item: ShipArrivalDeparture): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.shipArrivalDeparturesService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.arrivals = this.arrivals.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert('arrivée/départ supprimé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de arrivée/départ');
      }
    });
  }
}
