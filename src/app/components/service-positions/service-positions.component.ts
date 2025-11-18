import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ServicePositionsService } from '../../services/service-positions/service-positions.service';
import { ServicePosition, ServicePositionRequest } from '../../models/HRManagement';
import { AddServicePositionDialogComponent } from './add-service-positions-dialog/add-service-positions-dialog.component';
import { EditServicePositionDialogComponent } from './edit-service-positions-dialog/edit-service-positions-dialog.component';
import { ServicePositionDetailsDialogComponent } from './service-positions-details-dialog/service-positions-details-dialog.component';
import { DeleteServicePositionConfirmationComponent } from './delete-service-positions-confirmation/delete-service-positions-confirmation.component';

@Component({
  selector: 'app-service-positions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddServicePositionDialogComponent,
    EditServicePositionDialogComponent,
    ServicePositionDetailsDialogComponent,
    DeleteServicePositionConfirmationComponent
  ],
  templateUrl: './service-positions.component.html',
  styleUrl: './service-positions.component.css'
})
export class ServicePositionsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  services: ServicePosition[] = [];
  searchTerm = '';
  isLoading = false;

  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  openDetailsDialog = false;
  selecteditions: ServicePosition | null = null;

  constructor(private hritionssService: ServicePositionsService) {}

  ngOnInit() {
    this.loaditionss();
  }

  loaditionss() {
    this.isLoading = true;
    this.hritionssService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.services = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        alert('Erreur lors du chargement des services');
        this.isLoading = false;
      }
    });
  }

  get filtereditionss() {
    if (!this.searchTerm) return this.services;
    const term = this.searchTerm.toLowerCase();
    return this.services.filter(service =>
      service.positionName.toLowerCase().includes(term) ||
      (service.description && service.description.toLowerCase().includes(term))
    );
  }

  handleAdditions(newitions: ServicePositionRequest): void {
    this.hritionssService.create(newitions).subscribe({
      next: (res) => {
        if (res.data) {
          this.services = [...this.services, res.data];
        }
        this.openAddDialog = false;
        alert('itions créé avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création du service', err);
        alert('Erreur lors de la création du service');
      }
    });
  }

  handleEdititions(updateditions: ServicePositionRequest): void {
    if (!this.selecteditions) return;

    this.hritionssService.update(this.selecteditions.trackingId, updateditions).subscribe({
      next: (res) => {
        if (res.data) {
          this.services = this.services.map(g =>
            g.trackingId === this.selecteditions!.trackingId ? res.data! : g
          );
        }
        this.openEditDialog = false;
        this.selecteditions = null;
        alert('itions modifié avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification du service', err);
        alert('Erreur lors de la modification du service');
      }
    });
  }

  handleDeleteitions(): void {
    if (!this.selecteditions) return;

    this.hritionssService.delete(this.selecteditions.trackingId).subscribe({
      next: () => {
        this.services = this.services.filter(g => g.trackingId !== this.selecteditions!.trackingId);
        this.openDeleteDialog = false;
        this.selecteditions = null;
        alert('itions supprimé avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du service', err);
        alert('Erreur lors de la suppression du service');
      }
    });
  }

  openAdditionsDialog(): void {
    this.openAddDialog = true;
  }

  openEdititionsDialog(service: ServicePosition): void {
    this.selecteditions = service;
    this.openEditDialog = true;
  }

  openDeleteitionsDialog(service: ServicePosition): void {
    this.selecteditions = service;
    this.openDeleteDialog = true;
  }

  openitionsDetailsDialog(service: ServicePosition): void {
    this.selecteditions = service;
    this.openDetailsDialog = true;
  }
}
