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

  trainings: Training[] = [];
  searchTerm = '';
  isLoading = false;

  showAddDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;
  showDetailsDialog = false;
  selectedTraining: Training | null = null;

  constructor(private trainingsService: TrainingsService) {}

  ngOnInit() {
    this.loadTrainings();
  }

  loadTrainings() {
    this.isLoading = true;
    this.trainingsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.trainings = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading trainings:', error);
        alert('Erreur lors du chargement des formations');
        this.isLoading = false;
      }
    });
  }

  get filteredTrainings() {
    if (!this.searchTerm) return this.trainings;
    const term = this.searchTerm.toLowerCase();
    return this.trainings.filter(training =>
      training.trainingName.toLowerCase().includes(term) ||
      (training.description && training.description.toLowerCase().includes(term))
    );
  }

  handleAddTraining(newTraining: TrainingRequest): void {
    this.trainingsService.create(newTraining).subscribe({
      next: (res) => {
        if (res.data) {
          this.trainings = [...this.trainings, res.data];
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

  handleEditTraining(updatedTraining: TrainingRequest): void {
    if (!this.selectedTraining) return;

    this.trainingsService.update(this.selectedTraining.trackingId, updatedTraining).subscribe({
      next: (res) => {
        if (res.data) {
          this.trainings = this.trainings.map(g =>
            g.trackingId === this.selectedTraining!.trackingId ? res.data! : g
          );
        }
        this.showEditDialog = false;
        this.selectedTraining = null;
        alert('Formation modifiée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification de la formation', err);
        alert('Erreur lors de la modification de la formation');
      }
    });
  }

  handleDeleteTraining(): void {
    if (!this.selectedTraining) return;

    this.trainingsService.delete(this.selectedTraining.trackingId).subscribe({
      next: () => {
        this.trainings = this.trainings.filter(g => g.trackingId !== this.selectedTraining!.trackingId);
        this.showDeleteDialog = false;
        this.selectedTraining = null;
        alert('Formation supprimée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la formation', err);
        alert('Erreur lors de la suppression de la formation');
      }
    });
  }

  openAddTrainingDialog(): void {
    this.showAddDialog = true;
  }

  openEditTrainingDialog(training: Training): void {
    this.selectedTraining = training;
    this.showEditDialog = true;
  }

  openDeleteTrainingDialog(training: Training): void {
    this.selectedTraining = training;
    this.showDeleteDialog = true;
  }

  openTrainingDetailsDialog(training: Training): void {
    this.selectedTraining = training;
    this.showDetailsDialog = true;
  }
}
