import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { HRGradesService } from '../services/hr-grades/hr-grades.service';
import { HRGrade, HRGradeRequest } from '../models/HRManagement';
import { AddGradeDialogComponent } from './add-grade-dialog/add-grade-dialog.component';
import { EditGradeDialogComponent } from './edit-grade-dialog/edit-grade-dialog.component';
import { GradeDetailsDialogComponent } from './grade-details-dialog/grade-details-dialog.component';
import { DeleteGradeConfirmationComponent } from './delete-grade-confirmation/delete-grade-confirmation.component';

@Component({
  selector: 'app-hr-grades',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddGradeDialogComponent,
    EditGradeDialogComponent,
    GradeDetailsDialogComponent,
    DeleteGradeConfirmationComponent
  ],
  templateUrl: './hr-grades.component.html',
  styleUrl: './hr-grades.component.css'
})
export class HrGradesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  grades: HRGrade[] = [];
  searchTerm = '';
  isLoading = false;

  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  openDetailsDialog = false;
  selectedGrade: HRGrade | null = null;

  constructor(private hrGradesService: HRGradesService) {}

  ngOnInit() {
    this.loadGrades();
  }

  loadGrades() {
    this.isLoading = true;
    this.hrGradesService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.grades = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading grades:', error);
        alert('Erreur lors du chargement des grades');
        this.isLoading = false;
      }
    });
  }

  get filteredGrades() {
    if (!this.searchTerm) return this.grades;
    const term = this.searchTerm.toLowerCase();
    return this.grades.filter(grade =>
      grade.gradeName.toLowerCase().includes(term) ||
      (grade.description && grade.description.toLowerCase().includes(term))
    );
  }

  handleAddGrade(newGrade: HRGradeRequest): void {
    this.hrGradesService.create(newGrade).subscribe({
      next: (res) => {
        if (res.data) {
          this.grades = [...this.grades, res.data];
        }
        this.openAddDialog = false;
        alert('Grade créé avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création du grade', err);
        alert('Erreur lors de la création du grade');
      }
    });
  }

  handleEditGrade(updatedGrade: HRGradeRequest): void {
    if (!this.selectedGrade) return;

    this.hrGradesService.update(this.selectedGrade.trackingId, updatedGrade).subscribe({
      next: (res) => {
        if (res.data) {
          this.grades = this.grades.map(g =>
            g.trackingId === this.selectedGrade!.trackingId ? res.data! : g
          );
        }
        this.openEditDialog = false;
        this.selectedGrade = null;
        alert('Grade modifié avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification du grade', err);
        alert('Erreur lors de la modification du grade');
      }
    });
  }

  handleDeleteGrade(): void {
    if (!this.selectedGrade) return;

    this.hrGradesService.delete(this.selectedGrade.trackingId).subscribe({
      next: () => {
        this.grades = this.grades.filter(g => g.trackingId !== this.selectedGrade!.trackingId);
        this.openDeleteDialog = false;
        this.selectedGrade = null;
        alert('Grade supprimé avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du grade', err);
        alert('Erreur lors de la suppression du grade');
      }
    });
  }

  openAddGradeDialog(): void {
    this.openAddDialog = true;
  }

  openEditGradeDialog(grade: HRGrade): void {
    this.selectedGrade = grade;
    this.openEditDialog = true;
  }

  openDeleteGradeDialog(grade: HRGrade): void {
    this.selectedGrade = grade;
    this.openDeleteDialog = true;
  }

  openGradeDetailsDialog(grade: HRGrade): void {
    this.selectedGrade = grade;
    this.openDetailsDialog = true;
  }
}
