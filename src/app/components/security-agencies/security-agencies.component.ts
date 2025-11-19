import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SecurityAgenciesService } from '../../services/security-agencies/security-agencies.service';
import { AddSecurityAgenciesDialogComponent } from './add-security-agencies-dialog/add-security-agencies-dialog.component';
import { EditSecurityAgenciesDialogComponent } from './edit-security-agencies-dialog/edit-security-agencies-dialog.component';
import { DeleteSecurityAgenciesDialogComponent } from './delete-security-agencies-dialog/delete-security-agencies-dialog.component';
import { SecurityAgencyDetailsDialogComponent } from './security-agency-details-dialog/security-agency-details-dialog.component';
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
    DeleteSecurityAgenciesDialogComponent,
    SecurityAgencyDetailsDialogComponent
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
  showDetailsDialog = false;
  selectedItem: SecurityAgency | null = null;
  private searchSubject = new Subject<string>();

  constructor(private securityAgenciesService: SecurityAgenciesService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit() {
    this.loadSecurityAgenciess();
  }

  loadSecurityAgenciess() {
    this.performSearch(this.searchTerm);
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm);
  }

  performSearch(term: string) {
    this.isLoading = true;
    this.securityAgenciesService.search(term).subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.agencies = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching:', error);
        this.isLoading = false;
      }
    });
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

  openDetailsDialog(item: SecurityAgency): void {
    this.selectedItem = item;
    this.showDetailsDialog = true;
  }
}
