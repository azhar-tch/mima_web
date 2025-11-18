import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ConservatorSeizuresService } from '../services/conservator-seizures/conservator-seizures.service';
import { AddConservatorSeizuresDialogComponent } from './add-conservator-seizures-dialog/add-conservator-seizures-dialog.component';
import { EditConservatorSeizuresDialogComponent } from './edit-conservator-seizures-dialog/edit-conservator-seizures-dialog.component';
import { DeleteConservatorSeizuresDialogComponent } from './delete-conservator-seizures-dialog/delete-conservator-seizures-dialog.component';
import { ConservatorSeizure, ConservatorSeizureRequest } from '../models/Maritime';

@Component({
  selector: 'app-conservator-seizures',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddConservatorSeizuresDialogComponent,
    EditConservatorSeizuresDialogComponent,
    DeleteConservatorSeizuresDialogComponent
  ],
  templateUrl: './conservator-seizures.component.html',
  styleUrl: './conservator-seizures.component.css'
})
export class ConservatorSeizuresComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  seizures: ConservatorSeizure[] = [];
  searchTerm = '';
  isLoading = false;
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  selectedItem: ConservatorSeizure | null = null;

  constructor(private conservatorSeizuresService: ConservatorSeizuresService) {}

  ngOnInit() {
    this.loadConservatorSeizuress();
  }

  loadConservatorSeizuress() {
    this.isLoading = true;
    this.conservatorSeizuresService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.seizures = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading seizures:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredConservatorSeizuress() {
    if (!this.searchTerm) return this.seizures;
    const term = this.searchTerm.toLowerCase();
    return this.seizures.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  showAddDialog(): void {
    this.openAddDialog = true;
  }
  handleAdd(newItem: ConservatorSeizureRequest): void {
    this.conservatorSeizuresService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.seizures = [...this.seizures, res.data];
        }
        this.openAddDialog = false;
        alert('saisie créé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de saisie');
      }
    });
  }
  showEditDialog(item: ConservatorSeizure): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: ConservatorSeizureRequest): void {
    if (!this.selectedItem) return;

    this.conservatorSeizuresService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.seizures = this.seizures.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert('saisie modifié(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de saisie');
      }
    });
  }

  showDeleteDialog(item: ConservatorSeizure): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.conservatorSeizuresService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.seizures = this.seizures.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert('saisie supprimé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de saisie');
      }
    });
  }
}
