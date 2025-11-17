import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, MapPin } from 'lucide-angular';
import { AddMissionDialogComponent } from './add-mission-dialog/add-mission-dialog.component';
import { EditMissionDialogComponent } from './edit-mission-dialog/edit-mission-dialog.component';
import { DeleteMissionConfirmationComponent } from './delete-mission-confirmation/delete-mission-confirmation.component';
import { MissionsDetailsDialogComponent } from './missions-details-dialog/missions-details-dialog.component';
import { MissionsResponse, MissionsRequest } from '../models/Missions';
import { MissionsService } from '../services/missions/missions.service';
import { MissionStatus } from '../models/enums';

@Component({
  selector: 'app-missions',
  imports: [CommonModule, FormsModule, LucideAngularModule, AddMissionDialogComponent, EditMissionDialogComponent, DeleteMissionConfirmationComponent, MissionsDetailsDialogComponent],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css'
})
export class MissionsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly MapPin = MapPin;

  searchTerm = '';
  statusFilter = 'Toutes';
  showAddDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;
  showDetailsDialog = false;
  selectedMission: MissionsResponse | null = null;

  missions: MissionsResponse[] = [];

  constructor(private missionsService: MissionsService) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions() {
    this.missionsService.listMissions().subscribe({
      next: (res) => {
        this.missions = res.data || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des missions', err);
      }
    });
  }

  get filteredMissions() {
    return this.missions.filter(mission => {
      const matchesSearch = mission.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           mission.location?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           mission.shipName?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const statusMap: Record<string, MissionStatus | null> = {
        'Toutes': null,
        'Planifiée': MissionStatus.PLANNED,
        'En cours': MissionStatus.IN_PROGRESS,
        'Terminée': MissionStatus.COMPLETED,
        'Annulée': MissionStatus.CANCELLED
      };
      const matchesStatus = statusMap[this.statusFilter] === null || mission.status === statusMap[this.statusFilter];

      return matchesSearch && matchesStatus;
    });
  }

  openAddDialog() {
    this.showAddDialog = true;
  }

  openEditDialog(mission: MissionsResponse) {
    this.selectedMission = { ...mission };
    this.showEditDialog = true;
  }

  openDeleteDialog(mission: MissionsResponse) {
    this.selectedMission = mission;
    this.showDeleteDialog = true;
  }

  openDetailsDialog(mission: MissionsResponse) {
    this.selectedMission = mission;
    this.showDetailsDialog = true;
  }

  onMissionAdded(missionRequest: MissionsRequest) {
    this.missionsService.createMission(missionRequest).subscribe({
      next: (res) => {
        if (res.data) {
          this.missions.push(res.data);
        }
        this.showAddDialog = false;
      },
      error: (err) => {
        console.error('Erreur lors de la création de la mission', err);
        alert('Erreur lors de la création de la mission');
      }
    });
  }

  onMissionUpdated(updatedMission: MissionsResponse) {
    const index = this.missions.findIndex(m => m.trackingId === updatedMission.trackingId);
    if (index !== -1) {
      this.missions[index] = updatedMission;
    }
    this.showEditDialog = false;
    this.selectedMission = null;
  }

  onMissionDeleted() {
    if (!this.selectedMission) return;

    this.missionsService.deleteMission(this.selectedMission.trackingId).subscribe({
      next: () => {
        this.missions = this.missions.filter(m => m.trackingId !== this.selectedMission!.trackingId);
        this.showDeleteDialog = false;
        this.selectedMission = null;
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la mission', err);
        alert('Erreur lors de la suppression de la mission');
      }
    });
  }

  getStatusColor(status: MissionStatus): string {
    switch (status) {
      case MissionStatus.PLANNED: return 'bg-blue-600';
      case MissionStatus.IN_PROGRESS: return 'bg-orange-600';
      case MissionStatus.COMPLETED: return 'bg-green-600';
      case MissionStatus.CANCELLED: return 'bg-red-600';
      default: return 'bg-gray-400';
    }
  }

  getStatusLabel(status: MissionStatus): string {
    switch (status) {
      case MissionStatus.PLANNED: return 'Planifiée';
      case MissionStatus.IN_PROGRESS: return 'En cours';
      case MissionStatus.COMPLETED: return 'Terminée';
      case MissionStatus.CANCELLED: return 'Annulée';
      default: return 'Inconnu';
    }
  }

  formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
