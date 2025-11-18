import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Eye, Pencil, Trash2, Search } from 'lucide-angular';
import { AddDutyDialogComponent } from './add-duty-dialog/add-duty-dialog.component';
import { EditDutyDialogComponent } from './edit-duty-dialog/edit-duty-dialog.component';
import { DeleteDutyConfirmationComponent } from './delete-duty-confirmation/delete-duty-confirmation.component';
import { DutyDetailsDialogComponent } from './duty-details-dialog/duty-details-dialog.component';
import { DutiesService } from '../../services/duties/duties.service';
import { DutiesResponse, DutiesRequest } from '../../models/Duties';
import { DutyStatus, DutyType } from '../../models/enums';

@Component({
  selector: 'app-guards',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddDutyDialogComponent,
    EditDutyDialogComponent,
    DeleteDutyConfirmationComponent,
    DutyDetailsDialogComponent
  ],
  templateUrl: './duties.component.html',
  styleUrl: './duties.component.css'
})
export class DutiesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Eye = Eye;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  readonly Search = Search;
  readonly DutyStatus = DutyStatus;
  readonly DutyType = DutyType;

  duties: DutiesResponse[] = [];
  searchTerm = '';
  statusFilter: 'all' | DutyStatus = 'all';
  typeFilter: 'all' | DutyType = 'all';
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  openDetailsDialog = false;
  selectedDuty: DutiesResponse | null = null;

  constructor(private dutiesService: DutiesService) {}

  ngOnInit(): void {
    this.loadDuties();
  }

  loadDuties(): void {
    this.dutiesService.listDuties().subscribe({
      next: (res) => {
        this.duties = res.data || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des gardes', err);
        alert('Erreur lors du chargement des gardes');
      }
    });
  }

  get filteredDuties(): DutiesResponse[] {
    return this.duties.filter((duty) => {
      const matchesSearch =
        (duty.agentName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
        (duty.position?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
        (duty.unitName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false);
      const matchesStatus = this.statusFilter === 'all' || duty.status === this.statusFilter;
      const matchesType = this.typeFilter === 'all' || duty.dutyType === this.typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }

  handleAddDuty(newDuty: DutiesRequest): void {
    this.dutiesService.createDuty(newDuty).subscribe({
      next: (res) => {
        if (res.data) {
          this.duties = [...this.duties, res.data];
        }
        this.openAddDialog = false;
        alert('Garde créée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création de la garde', err);
        alert('Erreur lors de la création de la garde');
      }
    });
  }

  handleEditDuty(updatedDuty: DutiesRequest): void {
    if (!this.selectedDuty) return;

    this.dutiesService.updateDuty(this.selectedDuty.trackingId.toString(), updatedDuty).subscribe({
      next: (res) => {
        if (res.data) {
          this.duties = this.duties.map((d) =>
            d.trackingId === this.selectedDuty!.trackingId ? res.data! : d
          );
        }
        this.openEditDialog = false;
        this.selectedDuty = null;
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la garde', err);
        alert('Erreur lors de la mise à jour de la garde');
      }
    });
  }

  handleDeleteDuty(): void {
    if (!this.selectedDuty) return;

    this.dutiesService.deleteDuty(this.selectedDuty.trackingId.toString()).subscribe({
      next: () => {
        this.duties = this.duties.filter((d) => d.trackingId !== this.selectedDuty!.trackingId);
        this.openDeleteDialog = false;
        this.selectedDuty = null;
        alert('Garde supprimée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la garde', err);
        alert('Erreur lors de la suppression de la garde');
      }
    });
  }

  handleViewDetails(duty: DutiesResponse): void {
    this.selectedDuty = duty;
    this.openDetailsDialog = true;
  }

  handleEditAction(duty: DutiesResponse): void {
    this.selectedDuty = duty;
    this.openEditDialog = true;
  }

  handleDeleteAction(duty: DutiesResponse): void {
    this.selectedDuty = duty;
    this.openDeleteDialog = true;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusBadgeStyle(status: DutyStatus): string {
    switch (status) {
      case DutyStatus.PLANNED: return 'bg-blue-500 text-white';
      case DutyStatus.ACTIVE: return 'bg-indigo-600 text-white';
      case DutyStatus.COMPLETED: return 'bg-green-600 text-white';
      case DutyStatus.REPLACED: return 'bg-orange-500 text-white';
      case DutyStatus.CANCELLED: return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  }

  getTypeBadgeStyle(type: DutyType): string {
    switch (type) {
      case DutyType.WATCH: return 'bg-purple-500 text-white';
      case DutyType.BRIDGE_WATCH: return 'bg-indigo-500 text-white';
      case DutyType.ENGINE_WATCH: return 'bg-yellow-600 text-white';
      case DutyType.ANCHOR_WATCH: return 'bg-cyan-500 text-white';
      case DutyType.PORT_WATCH: return 'bg-teal-500 text-white';
      case DutyType.STANDBY: return 'bg-gray-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  }

  getAgentInitials(name: string | undefined): string {
    return name ? name.charAt(0) : '?';
  }

  getStatusLabel(status: DutyStatus): string {
    switch (status) {
      case DutyStatus.PLANNED: return 'Planifiée';
      case DutyStatus.ACTIVE: return 'Active';
      case DutyStatus.COMPLETED: return 'Terminée';
      case DutyStatus.REPLACED: return 'Remplacée';
      case DutyStatus.CANCELLED: return 'Annulée';
      default: return status;
    }
  }

  getTypeLabel(type: DutyType): string {
    switch (type) {
      case DutyType.WATCH: return 'Quart';
      case DutyType.BRIDGE_WATCH: return 'Quart de passerelle';
      case DutyType.ENGINE_WATCH: return 'Quart machine';
      case DutyType.ANCHOR_WATCH: return 'Quart au mouillage';
      case DutyType.PORT_WATCH: return 'Quart au port';
      case DutyType.STANDBY: return 'Astreinte';
      default: return type;
    }
  }

  calculateDuration(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours >= 24) {
      const days = Math.floor(diffHours / 24);
      const hours = diffHours % 24;
      return `${days}j ${hours}h`;
    }

    return `${diffHours}h ${diffMinutes}m`;
  }
}
