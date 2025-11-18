import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { TrainingsService } from '../services/trainings/trainings.service';
import { Training, TrainingRequest } from '../models/HRManagement';
import { AddTrainingDialogComponent } from './add-trainings-dialog/add-trainings-dialog.component';
import { EditTrainingDialogComponent } from './edit-trainings-dialog/edit-trainings-dialog.component';
import { TrainingDetailsDialogComponent } from './trainings-details-dialog/trainings-details-dialog.component';
import { DeleteTrainingConfirmationComponent } from './delete-trainings-confirmation/delete-trainings-confirmation.component';

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddTrainingDialogComponent,
    EditTrainingDialogComponent,
    TrainingDetailsDialogComponent,
    DeleteTrainingConfirmationComponent
  ],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css'
})
export class TrainingsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  trainingss: Training[] = [];
  searchTerm = '';
  isLoading = false;

  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  openDetailsDialog = false;
  selected: Training | null = null;

  constructor(private hrsService: TrainingsService) {}

  ngOnInit() {
    this.loads();
  }

  loads() {
    this.isLoading = true;
    this.hrsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.trainingss = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading trainingss:', error);
        alert('Erreur lors du chargement des trainingss');
        this.isLoading = false;
      }
    });
  }

  get filtereds() {
    if (!this.searchTerm) return this.trainingss;
    const term = this.searchTerm.toLowerCase();
    return this.trainingss.filter(trainings =>
      trainings.trainingsName.toLowerCase().includes(term) ||
      (trainings.description && trainings.description.toLowerCase().includes(term))
    );
  }

  handleAdd(new: TrainingRequest): void {
    this.hrsService.create(new).subscribe({
      next: (res) => {
        if (res.data) {
          this.trainingss = [...this.trainingss, res.data];
        }
        this.openAddDialog = false;
        alert(' créé avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création du trainings', err);
        alert('Erreur lors de la création du trainings');
      }
    });
  }

  handleEdit(updated: TrainingRequest): void {
    if (!this.selected) return;

    this.hrsService.update(this.selected.trackingId, updated).subscribe({
      next: (res) => {
        if (res.data) {
          this.trainingss = this.trainingss.map(g =>
            g.trackingId === this.selected!.trackingId ? res.data! : g
          );
        }
        this.openEditDialog = false;
        this.selected = null;
        alert(' modifié avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification du trainings', err);
        alert('Erreur lors de la modification du trainings');
      }
    });
  }

  handleDelete(): void {
    if (!this.selected) return;

    this.hrsService.delete(this.selected.trackingId).subscribe({
      next: () => {
        this.trainingss = this.trainingss.filter(g => g.trackingId !== this.selected!.trackingId);
        this.openDeleteDialog = false;
        this.selected = null;
        alert(' supprimé avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du trainings', err);
        alert('Erreur lors de la suppression du trainings');
      }
    });
  }

  openAddDialog(): void {
    this.openAddDialog = true;
  }

  openEditDialog(trainings: Training): void {
    this.selected = trainings;
    this.openEditDialog = true;
  }

  openDeleteDialog(trainings: Training): void {
    this.selected = trainings;
    this.openDeleteDialog = true;
  }

  openDetailsDialog(trainings: Training): void {
    this.selected = trainings;
    this.openDetailsDialog = true;
  }
}
