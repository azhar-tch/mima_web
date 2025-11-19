import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { CommercialShipsService } from '../../services/commercial-ships/commercial-ships.service';
import { AddCommercialShipsDialogComponent } from './add-commercial-ships-dialog/add-commercial-ships-dialog.component';
import { EditCommercialShipsDialogComponent } from './edit-commercial-ships-dialog/edit-commercial-ships-dialog.component';
import { DeleteCommercialShipsDialogComponent } from './delete-commercial-ships-dialog/delete-commercial-ships-dialog.component';
import { CommercialShipDetailsDialogComponent } from './commercial-ship-details-dialog/commercial-ship-details-dialog.component';
import { CommercialShip, CommercialShipRequest } from '../../models/Maritime';
import { ShipStatus } from '../../models/enums';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-commercial-ships',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddCommercialShipsDialogComponent,
    EditCommercialShipsDialogComponent,
    DeleteCommercialShipsDialogComponent,
    CommercialShipDetailsDialogComponent
  ],
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
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  showDetailsDialog = false;
  selectedItem: CommercialShip | null = null;
  private searchSubject = new Subject<string>();

  constructor(private commercialShipsService: CommercialShipsService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit() {
    this.loadCommercialShipss();
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm);
  }

  performSearch(term: string) {
    this.isLoading = true;
    this.commercialShipsService.search(term).subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.ships = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching ships:', error);
        this.isLoading = false;
      }
    });
  }

  loadCommercialShipss() {
    this.performSearch(this.searchTerm);
  }

  showAddDialog(): void {
    this.openAddDialog = true;
  }
  handleAdd(newItem: CommercialShipRequest): void {
    this.commercialShipsService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.ships = [...this.ships, res.data];
        }
        this.openAddDialog = false;
        alert('navire commercial créé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de navire commercial');
      }
    });
  }
  showEditDialog(item: CommercialShip): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: CommercialShipRequest): void {
    if (!this.selectedItem) return;

    this.commercialShipsService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.ships = this.ships.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert('navire commercial modifié(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de navire commercial');
      }
    });
  }

  showDeleteDialog(item: CommercialShip): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.commercialShipsService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.ships = this.ships.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert('navire commercial supprimé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de navire commercial');
      }
    });
  }

  openDetailsDialog(item: CommercialShip): void {
    this.selectedItem = item;
    this.showDetailsDialog = true;
  }

  getStatusLabel(status: ShipStatus | undefined): string {
    if (!status) return 'N/A';
    switch (status) {
      case ShipStatus.IN_PORT: return 'Au port';
      case ShipStatus.AT_SEA: return 'En mer';
      case ShipStatus.UNDER_ESCORT: return 'En escorte';
      case ShipStatus.WAITING: return 'En attente';
      case ShipStatus.LOADING: return 'En chargement';
      case ShipStatus.UNLOADING: return 'En déchargement';
      case ShipStatus.IN_MAINTENANCE: return 'En maintenance';
      case ShipStatus.IN_REPAIR: return 'En réparation';
      case ShipStatus.OTHER: return 'Autre';
      default: return status;
    }
  }

  getStatusBadgeClass(status: ShipStatus | undefined): string {
    if (!status) return 'bg-gray-100 text-gray-800';
    switch (status) {
      case ShipStatus.IN_PORT: return 'bg-green-100 text-green-800';
      case ShipStatus.AT_SEA: return 'bg-blue-100 text-blue-800';
      case ShipStatus.UNDER_ESCORT: return 'bg-purple-100 text-purple-800';
      case ShipStatus.WAITING: return 'bg-yellow-100 text-yellow-800';
      case ShipStatus.LOADING: return 'bg-orange-100 text-orange-800';
      case ShipStatus.UNLOADING: return 'bg-orange-100 text-orange-800';
      case ShipStatus.IN_MAINTENANCE: return 'bg-amber-100 text-amber-800';
      case ShipStatus.IN_REPAIR: return 'bg-red-100 text-red-800';
      case ShipStatus.OTHER: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
