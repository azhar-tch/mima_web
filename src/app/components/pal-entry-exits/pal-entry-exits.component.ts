import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { PALEntryExitsService } from '../../services/pal-entry-exits/pal-entry-exits.service';
import { AddPalEntryExitsDialogComponent } from './add-pal-entry-exits-dialog/add-pal-entry-exits-dialog.component';
import { EditPalEntryExitsDialogComponent } from './edit-pal-entry-exits-dialog/edit-pal-entry-exits-dialog.component';
import { DeletePalEntryExitsDialogComponent } from './delete-pal-entry-exits-dialog/delete-pal-entry-exits-dialog.component';
import { PALEntryExit, PALEntryExitRequest } from '../../models/Maritime';

@Component({
  selector: 'app-pal-entry-exits',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddPalEntryExitsDialogComponent,
    EditPalEntryExitsDialogComponent,
    DeletePalEntryExitsDialogComponent
  ],
  templateUrl: './pal-entry-exits.component.html',
  styleUrl: './pal-entry-exits.component.css'
})
export class PalEntryExitsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  entries: PALEntryExit[] = [];
  searchTerm = '';
  isLoading = false;
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  selectedItem: PALEntryExit | null = null;

  constructor(private palEntryExitsService: PALEntryExitsService) {}

  ngOnInit() {
    this.loadPalEntryExitss();
  }

  loadPalEntryExitss() {
    this.isLoading = true;
    this.palEntryExitsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.entries = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading entries:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredPalEntryExitss() {
    if (!this.searchTerm) return this.entries;
    const term = this.searchTerm.toLowerCase();
    return this.entries.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  showAddDialog(): void {
    this.openAddDialog = true;
  }

  handleAdd(newItem: PALEntryExitRequest): void {
    this.palEntryExitsService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.entries = [...this.entries, res.data];
        }
        this.openAddDialog = false;
        alert('entrée/sortie PAL créé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de entrée/sortie PAL');
      }
    });
  }

  showEditDialog(item: PALEntryExit): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: PALEntryExitRequest): void {
    if (!this.selectedItem) return;

    this.palEntryExitsService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.entries = this.entries.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert('entrée/sortie PAL modifié(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de entrée/sortie PAL');
      }
    });
  }

  showDeleteDialog(item: PALEntryExit): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.palEntryExitsService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.entries = this.entries.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert('entrée/sortie PAL supprimé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de entrée/sortie PAL');
      }
    });
  }
}
