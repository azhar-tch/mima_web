import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ShipIncidentsService } from '../../services/ship-incidents/ship-incidents.service';
import { AddShipIncidentsDialogComponent } from './add-ship-incidents-dialog/add-ship-incidents-dialog.component';
import { EditShipIncidentsDialogComponent } from './edit-ship-incidents-dialog/edit-ship-incidents-dialog.component';
import { DeleteShipIncidentsDialogComponent } from './delete-ship-incidents-dialog/delete-ship-incidents-dialog.component';
import { ShipIncidentDetailsDialogComponent } from './ship-incident-details-dialog/ship-incident-details-dialog.component';
import { ShipIncident, ShipIncidentRequest } from '../../models/Maritime';

@Component({
  selector: 'app-ship-incidents',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddShipIncidentsDialogComponent,
    EditShipIncidentsDialogComponent,
    DeleteShipIncidentsDialogComponent,
    ShipIncidentDetailsDialogComponent
  ],
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
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  showDetailsDialog = false;
  selectedItem: ShipIncident | null = null;
  private searchSubject = new Subject<string>();

  constructor(private shipIncidentsService: ShipIncidentsService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit() {
    this.loadShipIncidentss();
  }

  loadShipIncidentss() {
    this.performSearch(this.searchTerm);
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm);
  }

  performSearch(term: string) {
    this.isLoading = true;
    this.shipIncidentsService.search(term).subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.incidents = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching:', error);
        this.isLoading = false;
      }
    });
  }

  showAddDialog(): void {
    this.openAddDialog = true;
  }
  handleAdd(newItem: ShipIncidentRequest): void {
    this.shipIncidentsService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.incidents = [...this.incidents, res.data];
        }
        this.openAddDialog = false;
        alert('incident créé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de incident');
      }
    });
  }
  showEditDialog(item: ShipIncident): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: ShipIncidentRequest): void {
    if (!this.selectedItem) return;

    this.shipIncidentsService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.incidents = this.incidents.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert('incident modifié(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de incident');
      }
    });
  }

  showDeleteDialog(item: ShipIncident): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.shipIncidentsService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.incidents = this.incidents.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert('incident supprimé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de incident');
      }
    });
  }

  openDetailsDialog(item: ShipIncident): void {
    this.selectedItem = item;
    this.showDetailsDialog = true;
  }
}
