import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { OtherPositionsService } from '../../services/other-positions/other-positions.service';
import { OtherPosition, OtherPositionRequest } from '../../models/HRManagement';
import { AddOtherPositionDialogComponent } from './add-other-positions-dialog/add-other-positions-dialog.component';
import { EditOtherPositionDialogComponent } from './edit-other-positions-dialog/edit-other-positions-dialog.component';
import { OtherPositionDetailsDialogComponent } from './other-positions-details-dialog/other-positions-details-dialog.component';
import { DeleteOtherPositionConfirmationComponent } from './delete-other-positions-confirmation/delete-other-positions-confirmation.component';

@Component({
  selector: 'app-other-positions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddOtherPositionDialogComponent,
    EditOtherPositionDialogComponent,
    OtherPositionDetailsDialogComponent,
    DeleteOtherPositionConfirmationComponent
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
  selectedOtherPosition: OtherPosition | null = null;

  constructor(private otherPositionsService: OtherPositionsService) {}

  ngOnInit() {
    this.loadOtherPositions();
  }

  loadOtherPositions() {
    this.isLoading = true;
    this.otherPositionsService.list().subscribe({
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

  get filteredOtherPositions() {
    if (!this.searchTerm) return this.others;
    const term = this.searchTerm.toLowerCase();
    return this.others.filter(other =>
      other.positionName.toLowerCase().includes(term) ||
      (other.description && other.description.toLowerCase().includes(term))
    );
  }

  handleAddOtherPosition(newOtherPosition: OtherPositionRequest): void {
    this.otherPositionsService.create(newOtherPosition).subscribe({
      next: (res) => {
        if (res.data) {
          this.others = [...this.others, res.data];
        }
        this.openAddDialog = false;
        alert('Autre position créée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'autre position', err);
        alert('Erreur lors de la création de l\'autre position');
      }
    });
  }

  handleEditOtherPosition(updatedOtherPosition: OtherPositionRequest): void {
    if (!this.selectedOtherPosition) return;

    this.otherPositionsService.update(this.selectedOtherPosition.trackingId, updatedOtherPosition).subscribe({
      next: (res) => {
        if (res.data) {
          this.others = this.others.map(g =>
            g.trackingId === this.selectedOtherPosition!.trackingId ? res.data! : g
          );
        }
        this.openEditDialog = false;
        this.selectedOtherPosition = null;
        alert('Autre position modifiée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification de l\'autre position', err);
        alert('Erreur lors de la modification de l\'autre position');
      }
    });
  }

  handleDeleteOtherPosition(): void {
    if (!this.selectedOtherPosition) return;

    this.otherPositionsService.delete(this.selectedOtherPosition.trackingId).subscribe({
      next: () => {
        this.others = this.others.filter(g => g.trackingId !== this.selectedOtherPosition!.trackingId);
        this.openDeleteDialog = false;
        this.selectedOtherPosition = null;
        alert('Autre position supprimée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'autre position', err);
        alert('Erreur lors de la suppression de l\'autre position');
      }
    });
  }

  openAddOtherPositionDialog(): void {
    this.openAddDialog = true;
  }

  openEditOtherPositionDialog(other: OtherPosition): void {
    this.selectedOtherPosition = other;
    this.openEditDialog = true;
  }

  openDeleteOtherPositionDialog(other: OtherPosition): void {
    this.selectedOtherPosition = other;
    this.openDeleteDialog = true;
  }

  openOtherPositionDetailsDialog(other: OtherPosition): void {
    this.selectedOtherPosition = other;
    this.openDetailsDialog = true;
  }
}
