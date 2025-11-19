import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { PersonnelAllowancesService } from '../../services/personnel-allowances/personnel-allowances.service';
import { AddPersonnelAllowancesDialogComponent } from './add-personnel-allowances-dialog/add-personnel-allowances-dialog.component';
import { EditPersonnelAllowancesDialogComponent } from './edit-personnel-allowances-dialog/edit-personnel-allowances-dialog.component';
import { DeletePersonnelAllowancesDialogComponent } from './delete-personnel-allowances-dialog/delete-personnel-allowances-dialog.component';
import { PersonnelAllowanceDetailsDialogComponent } from './personnel-allowance-details-dialog/personnel-allowance-details-dialog.component';
import { PersonnelAllowance, PersonnelAllowanceRequest } from '../../models/Maritime';

@Component({
  selector: 'app-personnel-allowances',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddPersonnelAllowancesDialogComponent,
    EditPersonnelAllowancesDialogComponent,
    DeletePersonnelAllowancesDialogComponent,
    PersonnelAllowanceDetailsDialogComponent
  ],
  templateUrl: './personnel-allowances.component.html',
  styleUrl: './personnel-allowances.component.css'
})
export class PersonnelAllowancesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  allowances: PersonnelAllowance[] = [];
  searchTerm = '';
  isLoading = false;
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  showDetailsDialog = false;
  selectedItem: PersonnelAllowance | null = null;
  private searchSubject = new Subject<string>();

  constructor(private personnelAllowancesService: PersonnelAllowancesService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit() {
    this.loadPersonnelAllowancess();
  }

  loadPersonnelAllowancess() {
    this.performSearch(this.searchTerm);
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm);
  }

  performSearch(term: string) {
    this.isLoading = true;
    this.personnelAllowancesService.search(term).subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.allowances = response.data;
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
  handleAdd(newItem: PersonnelAllowanceRequest): void {
    this.personnelAllowancesService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.allowances = [...this.allowances, res.data];
        }
        this.openAddDialog = false;
        alert('indemnité créé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de indemnité');
      }
    });
  }
  showEditDialog(item: PersonnelAllowance): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: PersonnelAllowanceRequest): void {
    if (!this.selectedItem) return;

    this.personnelAllowancesService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.allowances = this.allowances.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert('indemnité modifié(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de indemnité');
      }
    });
  }

  showDeleteDialog(item: PersonnelAllowance): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.personnelAllowancesService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.allowances = this.allowances.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert('indemnité supprimé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de indemnité');
      }
    });
  }

  openDetailsDialog(item: PersonnelAllowance): void {
    this.selectedItem = item;
    this.showDetailsDialog = true;
  }
}
