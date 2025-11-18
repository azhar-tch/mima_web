import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { SecurityAgenciesService } from '../../services/security-agencies/security-agencies.service';
import { AddSecurityAgenciesDialogComponent } from './add-security-agencies-dialog/add-security-agencies-dialog.component';
import { EditSecurityAgenciesDialogComponent } from './edit-security-agencies-dialog/edit-security-agencies-dialog.component';
import { DeleteSecurityAgenciesDialogComponent } from './delete-security-agencies-dialog/delete-security-agencies-dialog.component';
import { SecurityAgency, SecurityAgencyRequest } from '../../models/Maritime';

@Component({
  selector: 'app-security-agencies',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddSecurityAgenciesDialogComponent,
    EditSecurityAgenciesDialogComponent,
    DeleteSecurityAgenciesDialogComponent
  ],
  templateUrl: './security-agencies.component.html',
  styleUrl: './security-agencies.component.css'
})
export class SecurityAgenciesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  agencies: SecurityAgency[] = [];
  searchTerm = '';
  isLoading = false;
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  selectedItem: SecurityAgency | null = null;

  constructor(private securityAgenciesService: SecurityAgenciesService) {}

  ngOnInit() {
    this.loadSecurityAgenciess();
  }

  loadSecurityAgenciess() {
    this.isLoading = true;
    this.securityAgenciesService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.agencies = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading agencies:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredSecurityAgenciess() {
    if (!this.searchTerm) return this.agencies;
    const term = this.searchTerm.toLowerCase();
    return this.agencies.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  showAddDialog(): void {
    this.openAddDialog = true;
  }
  handleAdd(newItem: SecurityAgencyRequest): void {
    this.securityAgenciesService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.agencies = [...this.agencies, res.data];
        }
        this.openAddDialog = false;
        alert('agence de sécurité créé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de agence de sécurité');
      }
    });
  }
  showEditDialog(item: SecurityAgency): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: SecurityAgencyRequest): void {
    if (!this.selectedItem) return;

    this.securityAgenciesService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.agencies = this.agencies.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert('agence de sécurité modifié(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de agence de sécurité');
      }
    });
  }

  showDeleteDialog(item: SecurityAgency): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.securityAgenciesService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.agencies = this.agencies.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert('agence de sécurité supprimé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de agence de sécurité');
      }
    });
  }
}
