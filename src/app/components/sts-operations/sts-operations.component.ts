import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { STSOperationsService } from '../../services/sts-operations/sts-operations.service';
import { AddStsOperationsDialogComponent } from './add-sts-operations-dialog/add-sts-operations-dialog.component';
import { EditStsOperationsDialogComponent } from './edit-sts-operations-dialog/edit-sts-operations-dialog.component';
import { DeleteStsOperationsDialogComponent } from './delete-sts-operations-dialog/delete-sts-operations-dialog.component';
import { STSOperation, STSOperationRequest } from '../../models/Maritime';

@Component({
  selector: 'app-sts-operations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddStsOperationsDialogComponent,
    EditStsOperationsDialogComponent,
    DeleteStsOperationsDialogComponent
  ],
  templateUrl: './sts-operations.component.html',
  styleUrl: './sts-operations.component.css'
})
export class StsOperationsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  operations: STSOperation[] = [];
  searchTerm = '';
  isLoading = false;
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  selectedItem: STSOperation | null = null;

  constructor(private stsOperationsService: STSOperationsService) {}

  ngOnInit() {
    this.loadStsOperationss();
  }

  loadStsOperationss() {
    this.isLoading = true;
    this.stsOperationsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.operations = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading operations:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredStsOperationss() {
    if (!this.searchTerm) return this.operations;
    const term = this.searchTerm.toLowerCase();
    return this.operations.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  showAddDialog(): void {
    this.openAddDialog = true;
  }
  handleAdd(newItem: STSOperationRequest): void {
    this.stsOperationsService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.operations = [...this.operations, res.data];
        }
        this.openAddDialog = false;
        alert('opération STS créé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de opération STS');
      }
    });
  }
  showEditDialog(item: STSOperation): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: STSOperationRequest): void {
    if (!this.selectedItem) return;

    this.stsOperationsService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.operations = this.operations.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert('opération STS modifié(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de opération STS');
      }
    });
  }

  showDeleteDialog(item: STSOperation): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.stsOperationsService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.operations = this.operations.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert('opération STS supprimé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de opération STS');
      }
    });
  }
}
