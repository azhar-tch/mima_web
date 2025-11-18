import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { TrainingsService } from '../../services/trainings/trainings.service';
import { Training, TrainingRequest } from '../../models/HRManagement';
// TODO: Create missing dialog components
// import { AddTrainingDialogComponent } from './add-trainings-dialog/add-trainings-dialog.component';
// import { EditTrainingDialogComponent } from './edit-trainings-dialog/edit-trainings-dialog.component';
// import { TrainingDetailsDialogComponent } from './trainings-details-dialog/trainings-details-dialog.component';
// import { DeleteTrainingConfirmationComponent } from './delete-trainings-confirmation/delete-trainings-confirmation.component';

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    // TODO: Uncomment when dialog components are created
    // AddTrainingDialogComponent,
    // EditTrainingDialogComponent,
    // TrainingDetailsDialogComponent,
    // DeleteTrainingConfirmationComponent
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

  showAddDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;
  showDetailsDialog = false;
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
      trainings.trainingName.toLowerCase().includes(term) ||
      (trainings.description && trainings.description.toLowerCase().includes(term))
    );
  }

  handleAdd(newTraining: TrainingRequest): void {
    this.hrsService.create(newTraining).subscribe({
      next: (res) => {
        if (res.data) {
          this.trainingss = [...this.trainingss, res.data];
        }
        this.showAddDialog = false;
        alert('Formation créée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création de la formation', err);
        alert('Erreur lors de la création de la formation');
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
        this.showEditDialog = false;
        this.selected = null;
        alert('Formation modifiée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification de la formation', err);
        alert('Erreur lors de la modification de la formation');
      }
    });
  }

  handleDelete(): void {
    if (!this.selected) return;

    this.hrsService.delete(this.selected.trackingId).subscribe({
      next: () => {
        this.trainingss = this.trainingss.filter(g => g.trackingId !== this.selected!.trackingId);
        this.showDeleteDialog = false;
        this.selected = null;
        alert('Formation supprimée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la formation', err);
        alert('Erreur lors de la suppression de la formation');
      }
    });
  }

  openAddDialog(): void {
    this.showAddDialog = true;
  }

  openEditDialog(trainings: Training): void {
    this.selected = trainings;
    this.showEditDialog = true;
  }

  openDeleteDialog(trainings: Training): void {
    this.selected = trainings;
    this.showDeleteDialog = true;
  }

  openDetailsDialog(trainings: Training): void {
    this.selected = trainings;
    this.showDetailsDialog = true;
  }
}
