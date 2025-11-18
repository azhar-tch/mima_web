import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { AwardsService } from '../services/awards/awards.service';
import { Award, AwardRequest } from '../models/HRManagement';
import { AddAwardDialogComponent } from './add-awards-dialog/add-awards-dialog.component';
import { EditAwardDialogComponent } from './edit-awards-dialog/edit-awards-dialog.component';
import { AwardDetailsDialogComponent } from './awards-details-dialog/awards-details-dialog.component';
import { DeleteAwardConfirmationComponent } from './delete-awards-confirmation/delete-awards-confirmation.component';

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddAwardDialogComponent,
    EditAwardDialogComponent,
    AwardDetailsDialogComponent,
    DeleteAwardConfirmationComponent
  ],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.css'
})
export class AwardsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  awardss: Award[] = [];
  searchTerm = '';
  isLoading = false;

  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  openDetailsDialog = false;
  selected: Award | null = null;

  constructor(private hrsService: AwardsService) {}

  ngOnInit() {
    this.loads();
  }

  loads() {
    this.isLoading = true;
    this.hrsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.awardss = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading awardss:', error);
        alert('Erreur lors du chargement des awardss');
        this.isLoading = false;
      }
    });
  }

  get filtereds() {
    if (!this.searchTerm) return this.awardss;
    const term = this.searchTerm.toLowerCase();
    return this.awardss.filter(awards =>
      awards.awardsName.toLowerCase().includes(term) ||
      (awards.description && awards.description.toLowerCase().includes(term))
    );
  }

  handleAdd(new: AwardRequest): void {
    this.hrsService.create(new).subscribe({
      next: (res) => {
        if (res.data) {
          this.awardss = [...this.awardss, res.data];
        }
        this.openAddDialog = false;
        alert(' créé avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création du awards', err);
        alert('Erreur lors de la création du awards');
      }
    });
  }

  handleEdit(updated: AwardRequest): void {
    if (!this.selected) return;

    this.hrsService.update(this.selected.trackingId, updated).subscribe({
      next: (res) => {
        if (res.data) {
          this.awardss = this.awardss.map(g =>
            g.trackingId === this.selected!.trackingId ? res.data! : g
          );
        }
        this.openEditDialog = false;
        this.selected = null;
        alert(' modifié avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification du awards', err);
        alert('Erreur lors de la modification du awards');
      }
    });
  }

  handleDelete(): void {
    if (!this.selected) return;

    this.hrsService.delete(this.selected.trackingId).subscribe({
      next: () => {
        this.awardss = this.awardss.filter(g => g.trackingId !== this.selected!.trackingId);
        this.openDeleteDialog = false;
        this.selected = null;
        alert(' supprimé avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du awards', err);
        alert('Erreur lors de la suppression du awards');
      }
    });
  }

  openAddDialog(): void {
    this.openAddDialog = true;
  }

  openEditDialog(awards: Award): void {
    this.selected = awards;
    this.openEditDialog = true;
  }

  openDeleteDialog(awards: Award): void {
    this.selected = awards;
    this.openDeleteDialog = true;
  }

  openDetailsDialog(awards: Award): void {
    this.selected = awards;
    this.openDetailsDialog = true;
  }
}
