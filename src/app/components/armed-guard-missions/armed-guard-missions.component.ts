import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ArmedGuardMissionsService } from '../../services/armed-guard-missions/armed-guard-missions.service';
import { AddArmedGuardMissionsDialogComponent } from './add-armed-guard-missions-dialog/add-armed-guard-missions-dialog.component';
import { EditArmedGuardMissionsDialogComponent } from './edit-armed-guard-missions-dialog/edit-armed-guard-missions-dialog.component';
import { DeleteArmedGuardMissionsDialogComponent } from './delete-armed-guard-missions-dialog/delete-armed-guard-missions-dialog.component';
import { ArmedGuardMissionDetailsDialogComponent } from './armed-guard-mission-details-dialog/armed-guard-mission-details-dialog.component';
import { ArmedGuardMission, ArmedGuardMissionRequest } from '../../models/Maritime';

@Component({
  selector: 'app-armed-guard-missions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddArmedGuardMissionsDialogComponent,
    EditArmedGuardMissionsDialogComponent,
    DeleteArmedGuardMissionsDialogComponent,
    ArmedGuardMissionDetailsDialogComponent
  ],
  templateUrl: './armed-guard-missions.component.html',
  styleUrl: './armed-guard-missions.component.css'
})
export class ArmedGuardMissionsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  missions: ArmedGuardMission[] = [];
  searchTerm = '';
  isLoading = false;
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  showDetailsDialog = false;
  selectedItem: ArmedGuardMission | null = null;

  constructor(private armedGuardMissionsService: ArmedGuardMissionsService) {}

  ngOnInit() {
    this.loadArmedGuardMissionss();
  }

  loadArmedGuardMissionss() {
    this.isLoading = true;
    this.armedGuardMissionsService.list().subscribe({
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

  get filteredArmedGuardMissionss() {
    if (!this.searchTerm) return this.missions;
    const term = this.searchTerm.toLowerCase();
    return this.missions.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  showAddDialog(): void {
    this.openAddDialog = true;
  }
  handleAdd(newItem: ArmedGuardMissionRequest): void {
    this.armedGuardMissionsService.create(newItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.missions = [...this.missions, res.data];
        }
        this.openAddDialog = false;
        alert('mission de garde armée créé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
        alert('Erreur lors de la création de mission de garde armée');
      }
    });
  }
  showEditDialog(item: ArmedGuardMission): void {
    this.selectedItem = item;
    this.openEditDialog = true;
  }

  handleEdit(updatedItem: ArmedGuardMissionRequest): void {
    if (!this.selectedItem) return;

    this.armedGuardMissionsService.update(this.selectedItem.trackingId, updatedItem).subscribe({
      next: (res) => {
        if (res.data) {
          this.missions = this.missions.map(item =>
            item.trackingId === this.selectedItem!.trackingId ? res.data! : item
          );
        }
        this.openEditDialog = false;
        this.selectedItem = null;
        alert('mission de garde armée modifié(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Erreur lors de la modification de mission de garde armée');
      }
    });
  }

  showDeleteDialog(item: ArmedGuardMission): void {
    this.selectedItem = item;
    this.openDeleteDialog = true;
  }

  handleDelete(): void {
    if (!this.selectedItem) return;

    this.armedGuardMissionsService.delete(this.selectedItem.trackingId).subscribe({
      next: () => {
        this.missions = this.missions.filter(item => item.trackingId !== this.selectedItem!.trackingId);
        this.openDeleteDialog = false;
        this.selectedItem = null;
        alert('mission de garde armée supprimé(e) avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        alert('Erreur lors de la suppression de mission de garde armée');
      }
    });
  }

  openDetailsDialog(item: ArmedGuardMission): void {
    this.selectedItem = item;
    this.showDetailsDialog = true;
  }
}
