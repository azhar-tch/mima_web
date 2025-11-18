import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { HRFunctionsService } from '../../services/hr-functions/hr-functions.service';
import { HRFunction, HRFunctionRequest } from '../../models/HRManagement';
import { AddFunctionDialogComponent } from './add-function-dialog/add-function-dialog.component';
import { EditFunctionDialogComponent } from './edit-function-dialog/edit-function-dialog.component';
import { FunctionDetailsDialogComponent } from './function-details-dialog/function-details-dialog.component';
import { DeleteFunctionConfirmationComponent } from './delete-function-confirmation/delete-function-confirmation.component';

@Component({
  selector: 'app-hr-functions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddFunctionDialogComponent,
    EditFunctionDialogComponent,
    FunctionDetailsDialogComponent,
    DeleteFunctionConfirmationComponent
  ],
  templateUrl: './hr-functions.component.html',
  styleUrl: './hr-functions.component.css'
})
export class HrFunctionsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  hrs: HRFunction[] = [];
  searchTerm = '';
  isLoading = false;

  showAddDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;
  showDetailsDialog = false;
  selected: HRFunction | null = null;

  constructor(private hrsService: HRFunctionsService) {}

  ngOnInit() {
    this.loads();
  }

  loads() {
    this.isLoading = true;
    this.hrsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.hrs = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading hrs:', error);
        alert('Erreur lors du chargement des hrs');
        this.isLoading = false;
      }
    });
  }

  get filtereds() {
    if (!this.searchTerm) return this.hrs;
    const term = this.searchTerm.toLowerCase();
    return this.hrs.filter(hr =>
      hr.functionName.toLowerCase().includes(term) ||
      (hr.description && hr.description.toLowerCase().includes(term))
    );
  }

  handleAdd(newFunction: HRFunctionRequest): void {
    this.hrsService.create(newFunction).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.hrs = [...this.hrs, res.data];
        }
        this.showAddDialog = false;
        alert(' créé avec succès');
      },
      error: (err: any) => {
        console.error('Erreur lors de la création du hr', err);
        alert('Erreur lors de la création du hr');
      }
    });
  }

  handleEdit(updated: HRFunctionRequest): void {
    if (!this.selected) return;

    this.hrsService.update(this.selected.trackingId, updated).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.hrs = this.hrs.map(g =>
            g.trackingId === this.selected!.trackingId ? res.data! : g
          );
        }
        this.showEditDialog = false;
        this.selected = null;
        alert(' modifié avec succès');
      },
      error: (err: any) => {
        console.error('Erreur lors de la modification du hr', err);
        alert('Erreur lors de la modification du hr');
      }
    });
  }

  handleDelete(): void {
    if (!this.selected) return;

    this.hrsService.delete(this.selected.trackingId).subscribe({
      next: () => {
        this.hrs = this.hrs.filter(g => g.trackingId !== this.selected!.trackingId);
        this.showDeleteDialog = false;
        this.selected = null;
        alert(' supprimé avec succès');
      },
      error: (err: any) => {
        console.error('Erreur lors de la suppression du hr', err);
        alert('Erreur lors de la suppression du hr');
      }
    });
  }

  openAddDialog(): void {
    this.showAddDialog = true;
  }

  openEditDialog(hr: HRFunction): void {
    this.selected = hr;
    this.showEditDialog = true;
  }

  openDeleteDialog(hr: HRFunction): void {
    this.selected = hr;
    this.showDeleteDialog = true;
  }

  openDetailsDialog(hr: HRFunction): void {
    this.selected = hr;
    this.showDetailsDialog = true;
  }
}
