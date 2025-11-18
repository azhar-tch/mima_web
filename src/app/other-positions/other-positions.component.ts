import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { OtherPositionsService } from '../services/other-positions/other-positions.service';
import { OtherPosition, OtherPositionRequest } from '../models/HRManagement';
import { AdditionsDialogComponent } from './add-other-dialog/add-other-dialog.component';
import { EdititionsDialogComponent } from './edit-other-dialog/edit-other-dialog.component';
import { itionsOtherPositionDetailsDialogComponent } from './other-details-dialog/other-details-dialog.component';
import { DeleteitionsConfirmationComponent } from './delete-other-confirmation/delete-other-confirmation.component';

@Component({
  selector: 'app-other-positions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AdditionsDialogComponent,
    EdititionsDialogComponent,
    itionsOtherPositionDetailsDialogComponent,
    DeleteitionsConfirmationComponent
  ],
  templateUrl: './other-positions.component.html',
  styleUrl: './other-positions.component.css'
})
export class OtherPositionsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  others: OtherPosition[] = [];
  searchTerm = '';
  isLoading = false;

  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  openDetailsDialog = false;
  selecteditions: OtherPosition | null = null;

  constructor(private hritionssService: OtherPositionsService) {}

  ngOnInit() {
    this.loaditionss();
  }

  loaditionss() {
    this.isLoading = true;
    this.hritionssService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.others = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading others:', error);
        alert('Erreur lors du chargement des others');
        this.isLoading = false;
      }
    });
  }

  get filtereditionss() {
    if (!this.searchTerm) return this.others;
    const term = this.searchTerm.toLowerCase();
    return this.others.filter(other =>
      other.positionName.toLowerCase().includes(term) ||
      (other.description && other.description.toLowerCase().includes(term))
    );
  }

  handleAdditions(newitions: OtherPositionRequest): void {
    this.hritionssService.create(newitions).subscribe({
      next: (res) => {
        if (res.data) {
          this.others = [...this.others, res.data];
        }
        this.openAddDialog = false;
        alert('itions créé avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création du other', err);
        alert('Erreur lors de la création du other');
      }
    });
  }

  handleEdititions(updateditions: OtherPositionRequest): void {
    if (!this.selecteditions) return;

    this.hritionssService.update(this.selecteditions.trackingId, updateditions).subscribe({
      next: (res) => {
        if (res.data) {
          this.others = this.others.map(g =>
            g.trackingId === this.selecteditions!.trackingId ? res.data! : g
          );
        }
        this.openEditDialog = false;
        this.selecteditions = null;
        alert('itions modifié avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification du other', err);
        alert('Erreur lors de la modification du other');
      }
    });
  }

  handleDeleteitions(): void {
    if (!this.selecteditions) return;

    this.hritionssService.delete(this.selecteditions.trackingId).subscribe({
      next: () => {
        this.others = this.others.filter(g => g.trackingId !== this.selecteditions!.trackingId);
        this.openDeleteDialog = false;
        this.selecteditions = null;
        alert('itions supprimé avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du other', err);
        alert('Erreur lors de la suppression du other');
      }
    });
  }

  openAdditionsDialog(): void {
    this.openAddDialog = true;
  }

  openEdititionsDialog(other: OtherPosition): void {
    this.selecteditions = other;
    this.openEditDialog = true;
  }

  openDeleteitionsDialog(other: OtherPosition): void {
    this.selecteditions = other;
    this.openDeleteDialog = true;
  }

  openitionsDetailsDialog(other: OtherPosition): void {
    this.selecteditions = other;
    this.openDetailsDialog = true;
  }
}
