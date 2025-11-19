import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { NavalVesselsService } from '../../services/naval-vessels/naval-vessels.service';
import { AddNavalVesselsDialogComponent } from './add-naval-vessels-dialog/add-naval-vessels-dialog.component';
import { EditNavalVesselsDialogComponent } from './edit-naval-vessels-dialog/edit-naval-vessels-dialog.component';
import { DeleteNavalVesselsDialogComponent } from './delete-naval-vessels-dialog/delete-naval-vessels-dialog.component';
import { NavalVesselDetailsDialogComponent } from './naval-vessel-details-dialog/naval-vessel-details-dialog.component';
import { NavalVessel, NavalVesselRequest } from '../../models/Maritime';

@Component({
  selector: 'app-naval-vessels',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddNavalVesselsDialogComponent,
    EditNavalVesselsDialogComponent,
    DeleteNavalVesselsDialogComponent,
    NavalVesselDetailsDialogComponent
  ],
  templateUrl: './naval-vessels.component.html',
  styleUrl: './naval-vessels.component.css'
})
export class NavalVesselsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  vessels: NavalVessel[] = [];
  searchTerm = '';
  isLoading = false;
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  showDetailsDialog = false;
  selectedItem: NavalVessel | null = null;

  constructor(private navalVesselsService: NavalVesselsService) {}

  ngOnInit() {
    this.loadNavalVesselss();
  }

  loadNavalVesselss() {
    this.isLoading = true;
    this.navalVesselsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.vessels = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading vessels:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredNavalVesselss() {
    if (!this.searchTerm) return this.vessels;
    const term = this.searchTerm.toLowerCase();
    return this.vessels.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  showAddDialog(): void {
    this.openAddDialog = true;
  }
  handleAdd(newItem: NavalVesselRequest): void {
    this.navalVesselsService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.vessels = [...this.vessels, res.data];
        }
        this.openAddDialog = false;
        alert('navire militaire créé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de navire militaire');
      }
    });
  }
  showEditDialog(item: NavalVessel): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: NavalVesselRequest): void {
    if (!this.selectedItem) return;

    this.navalVesselsService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.vessels = this.vessels.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert('navire militaire modifié(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de navire militaire');
      }
    });
  }

  showDeleteDialog(item: NavalVessel): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.navalVesselsService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.vessels = this.vessels.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert('navire militaire supprimé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de navire militaire');
      }
    });
  }

  openDetailsDialog(item: NavalVessel): void {
    this.selectedItem = item;
    this.showDetailsDialog = true;
  }
}
