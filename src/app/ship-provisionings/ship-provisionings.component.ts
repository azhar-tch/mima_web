import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ShipProvisioningsService } from '../services/ship-provisionings/ship-provisionings.service';
import { AddShipProvisioningsDialogComponent } from './add-ship-provisionings-dialog/add-ship-provisionings-dialog.component';
import { EditShipProvisioningsDialogComponent } from './edit-ship-provisionings-dialog/edit-ship-provisionings-dialog.component';
import { DeleteShipProvisioningsDialogComponent } from './delete-ship-provisionings-dialog/delete-ship-provisionings-dialog.component';
import { ShipProvisioning, ShipProvisioningRequest } from '../models/Maritime';

@Component({
  selector: 'app-ship-provisionings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddShipProvisioningsDialogComponent,
    EditShipProvisioningsDialogComponent,
    DeleteShipProvisioningsDialogComponent
  ],
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
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  selectedItem: ShipProvisioning | null = null;

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
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  selectedItem: ShipProvisioning | null = null;
      },
      error: (error) => {
        console.error('Error loading provisionings:', error);
        this.isLoading = false;
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  selectedItem: ShipProvisioning | null = null;
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
    this.openAddDialog = true;
  }
  handleAdd(newItem: ShipProvisioningRequest): void {
    this.shipProvisioningsService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.provisionings = [...this.provisionings, res.data];
        }
        this.openAddDialog = false;
        alert('avitaillement créé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de avitaillement');
      }
    });
  }
  openEditDialog(item: ShipProvisioning): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: ShipProvisioningRequest): void {
    if (!this.selectedItem) return;

    this.shipProvisioningsService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.provisionings = this.provisionings.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert('avitaillement modifié(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de avitaillement');
      }
    });
  }

  openDeleteDialog(item: ShipProvisioning): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.shipProvisioningsService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.provisionings = this.provisionings.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert('avitaillement supprimé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de avitaillement');
      }
    });
  }
}
