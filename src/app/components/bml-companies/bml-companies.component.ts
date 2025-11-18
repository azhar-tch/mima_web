import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { BMLCompaniesService } from '../../services/bml-companies/bml-companies.service';
import { BMLCompany, BMLCompanyRequest } from '../../models/HRManagement';
import { AddBmlCompanyDialogComponent } from './add-bml-companies-dialog/add-bml-companies-dialog.component';
import { EditBmlCompanyDialogComponent } from './edit-bml-companies-dialog/edit-bml-companies-dialog.component';
import { BmlCompanyDetailsDialogComponent } from './bml-companies-details-dialog/bml-companies-details-dialog.component';
import { DeleteBmlCompanyConfirmationComponent } from './delete-bml-companies-confirmation/delete-bml-companies-confirmation.component';

@Component({
  selector: 'app-bml-companies',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddBmlCompanyDialogComponent,
    EditBmlCompanyDialogComponent,
    BmlCompanyDetailsDialogComponent,
    DeleteBmlCompanyConfirmationComponent
  ],
  templateUrl: './bml-companies.component.html',
  styleUrl: './bml-companies.component.css'
})
export class BmlCompaniesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  bmls: BMLCompany[] = [];
  searchTerm = '';
  isLoading = false;

  showAddDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;
  showDetailsDialog = false;
  selected: BMLCompany | null = null;

  constructor(private hrsService: BMLCompaniesService) {}

  ngOnInit() {
    this.loads();
  }

  loads() {
    this.isLoading = true;
    this.hrsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.bmls = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading bmls:', error);
        alert('Erreur lors du chargement des bmls');
        this.isLoading = false;
      }
    });
  }

  get filtereds() {
    if (!this.searchTerm) return this.bmls;
    const term = this.searchTerm.toLowerCase();
    return this.bmls.filter(bml =>
      bml.companyName.toLowerCase().includes(term) ||
      (bml.description && bml.description.toLowerCase().includes(term))
    );
  }

  handleAdd(newCompany: BMLCompanyRequest): void {
    this.hrsService.create(newCompany).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.bmls = [...this.bmls, res.data];
        }
        this.showAddDialog = false;
        alert(' créé avec succès');
      },
      error: (err: any) => {
        console.error('Erreur lors de la création du bml', err);
        alert('Erreur lors de la création du bml');
      }
    });
  }

  handleEdit(updated: BMLCompanyRequest): void {
    if (!this.selected) return;

    this.hrsService.update(this.selected.trackingId, updated).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.bmls = this.bmls.map(g =>
            g.trackingId === this.selected!.trackingId ? res.data! : g
          );
        }
        this.showEditDialog = false;
        this.selected = null;
        alert(' modifié avec succès');
      },
      error: (err: any) => {
        console.error('Erreur lors de la modification du bml', err);
        alert('Erreur lors de la modification du bml');
      }
    });
  }

  handleDelete(): void {
    if (!this.selected) return;

    this.hrsService.delete(this.selected.trackingId).subscribe({
      next: () => {
        this.bmls = this.bmls.filter(g => g.trackingId !== this.selected!.trackingId);
        this.showDeleteDialog = false;
        this.selected = null;
        alert(' supprimé avec succès');
      },
      error: (err: any) => {
        console.error('Erreur lors de la suppression du bml', err);
        alert('Erreur lors de la suppression du bml');
      }
    });
  }

  openAddDialog(): void {
    this.showAddDialog = true;
  }

  openEditDialog(bml: BMLCompany): void {
    this.selected = bml;
    this.showEditDialog = true;
  }

  openDeleteDialog(bml: BMLCompany): void {
    this.selected = bml;
    this.showDeleteDialog = true;
  }

  openDetailsDialog(bml: BMLCompany): void {
    this.selected = bml;
    this.showDetailsDialog = true;
  }
}
