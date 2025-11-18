import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { EscortMissionsService } from '../services/escort-missions/escort-missions.service';
import { AddEscortMissionsDialogComponent } from './add-escort-missions-dialog/add-escort-missions-dialog.component';
import { EditEscortMissionsDialogComponent } from './edit-escort-missions-dialog/edit-escort-missions-dialog.component';
import { DeleteEscortMissionsDialogComponent } from './delete-escort-missions-dialog/delete-escort-missions-dialog.component';
import { EscortMission, EscortMissionRequest } from '../models/Maritime';

@Component({
  selector: 'app-escort-missions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddEscortMissionsDialogComponent,
    EditEscortMissionsDialogComponent,
    DeleteEscortMissionsDialogComponent
  ],
  templateUrl: './escort-missions.component.html',
  styleUrl: './escort-missions.component.css'
})
export class EscortMissionsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  missions: EscortMission[] = [];
  searchTerm = '';
  isLoading = false;
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  selectedItem: EscortMission | null = null;

  constructor(private escortMissionsService: EscortMissionsService) {}

  ngOnInit() {
    this.loadEscortMissionss();
  }

  loadEscortMissionss() {
    this.isLoading = true;
    this.escortMissionsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.missions = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading missions:', error);
        this.isLoading = false;
      }
    });
  }

  get filteredEscortMissionss() {
    if (!this.searchTerm) return this.missions;
    const term = this.searchTerm.toLowerCase();
    return this.missions.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  showAddDialog(): void {
    this.openAddDialog = true;
  }
  handleAdd(newItem: EscortMissionRequest): void {
    this.escortMissionsService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.missions = [...this.missions, res.data];
        }
        this.openAddDialog = false;
        alert("mission d'escorte créé(e) avec succès");
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert("Erreur lors de la création de mission d'escorte");
      }
    });
  }
  showEditDialog(item: EscortMission): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: EscortMissionRequest): void {
    if (!this.selectedItem) return;

    this.escortMissionsService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.missions = this.missions.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert("mission d'escorte modifié(e) avec succès");
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert("Erreur lors de la modification de mission d'escorte");
      }
    });
  }

  showDeleteDialog(item: EscortMission): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.escortMissionsService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.missions = this.missions.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert("mission d'escorte supprimé(e) avec succès");
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert("Erreur lors de la suppression de mission d'escorte");
      }
    });
  }
}
