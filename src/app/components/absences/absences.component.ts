import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Eye, Pencil, Trash2, Search } from 'lucide-angular';
import { AddAbsenceDialogComponent } from './add-absence-dialog/add-absence-dialog.component';
import { EditAbsenceDialogComponent } from './edit-absence-dialog/edit-absence-dialog.component';
import { DeleteAbsenceConfirmationComponent } from './delete-absence-confirmation/delete-absence-confirmation.component';
import { AbsenceDetailsDialogComponent } from './absence-details-dialog/absence-details-dialog.component';
import { AbsencesService } from '../../services/absences/absences.service';
import { AbsencesResponse, AbsencesRequest } from '../../models/Absences';
import { AbsenceStatus, AbsenceType } from '../../models/enums';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddAbsenceDialogComponent,
    EditAbsenceDialogComponent,
    DeleteAbsenceConfirmationComponent,
    AbsenceDetailsDialogComponent
  ],
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.css'
})
export class AbsencesComponent implements OnInit {
  readonly Plus = Plus;
  readonly Eye = Eye;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  readonly Search = Search;
  readonly AbsenceStatus = AbsenceStatus;
  readonly AbsenceType = AbsenceType;

  absences: AbsencesResponse[] = [];
  searchTerm = '';
  statusFilter: 'all' | AbsenceStatus = 'all';
  typeFilter: 'all' | AbsenceType = 'all';
  openAddDialog = false;
  openEditDialog = false;
  openDeleteDialog = false;
  openDetailsDialog = false;
  selectedAbsence: AbsencesResponse | null = null;

  constructor(
    private absencesService: AbsencesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAbsences();
  }

  loadAbsences(): void {
    this.absencesService.listAbsences().subscribe({
      next: (res) => {
        this.absences = res.data || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des absences', err);
        alert('Erreur lors du chargement des absences');
      }
    });
  }

  get filteredAbsences(): AbsencesResponse[] {
    return this.absences.filter((absence) => {
      const matchesSearch =
        (absence.agentName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
        (absence.reason?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false);
      const matchesStatus = this.statusFilter === 'all' || absence.status === this.statusFilter;
      const matchesType = this.typeFilter === 'all' || absence.absenceType === this.typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }

  handleAddAbsence(newAbsence: AbsencesRequest): void {
    this.absencesService.createAbsence(newAbsence).subscribe({
      next: (res) => {
        if (res.data) {
          this.absences = [...this.absences, res.data];
        }
        this.openAddDialog = false;
        alert('Absence créée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'absence', err);
        alert('Erreur lors de la création de l\'absence');
      }
    });
  }

  handleEditAbsence(updatedAbsence: AbsencesRequest): void {
    if (!this.selectedAbsence) return;

    this.absencesService.updateAbsence(this.selectedAbsence.trackingId.toString(), updatedAbsence).subscribe({
      next: (res) => {
        if (res.data) {
          this.absences = this.absences.map((a) =>
            a.trackingId === this.selectedAbsence!.trackingId ? res.data! : a
          );
        }
        this.openEditDialog = false;
        this.selectedAbsence = null;
        alert('Absence mise à jour avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de l\'absence', err);
        alert('Erreur lors de la mise à jour de l\'absence');
      }
    });
  }

  handleDeleteAbsence(): void {
    if (!this.selectedAbsence) return;

    this.absencesService.deleteAbsence(this.selectedAbsence.trackingId.toString()).subscribe({
      next: () => {
        this.absences = this.absences.filter((a) => a.trackingId !== this.selectedAbsence!.trackingId);
        this.openDeleteDialog = false;
        this.selectedAbsence = null;
        alert('Absence supprimée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'absence', err);
        alert('Erreur lors de la suppression de l\'absence');
      }
    });
  }

  handleViewDetails(absence: AbsencesResponse): void {
    this.selectedAbsence = absence;
    this.openDetailsDialog = true;
  }

  handleEditAction(absence: AbsencesResponse): void {
    this.selectedAbsence = absence;
    this.openEditDialog = true;
  }

  handleDeleteAction(absence: AbsencesResponse): void {
    this.selectedAbsence = absence;
    this.openDeleteDialog = true;
  }

  handleApproveAbsence(): void {
    if (!this.selectedAbsence) return;

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.trackingId) {
      alert('Erreur : utilisateur non connecté');
      return;
    }

    this.absencesService.updateAbsenceStatus(
      this.selectedAbsence.trackingId.toString(),
      AbsenceStatus.APPROVED,
      currentUser.trackingId
    ).subscribe({
      next: (res) => {
        if (res.data) {
          this.absences = this.absences.map((a) =>
            a.trackingId === this.selectedAbsence!.trackingId ? res.data! : a
          );
        }
        this.openDetailsDialog = false;
        this.selectedAbsence = null;
        alert('Absence approuvée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de l\'approbation de l\'absence', err);
        alert('Erreur lors de l\'approbation de l\'absence');
      }
    });
  }

  handleRejectAbsence(): void {
    if (!this.selectedAbsence) return;

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.trackingId) {
      alert('Erreur : utilisateur non connecté');
      return;
    }

    this.absencesService.updateAbsenceStatus(
      this.selectedAbsence.trackingId.toString(),
      AbsenceStatus.REJECTED,
      currentUser.trackingId
    ).subscribe({
      next: (res) => {
        if (res.data) {
          this.absences = this.absences.map((a) =>
            a.trackingId === this.selectedAbsence!.trackingId ? res.data! : a
          );
        }
        this.openDetailsDialog = false;
        this.selectedAbsence = null;
        alert('Absence rejetée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors du rejet de l\'absence', err);
        alert('Erreur lors du rejet de l\'absence');
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  getStatusBadgeStyle(status: AbsenceStatus): string {
    switch (status) {
      case AbsenceStatus.PENDING: return 'bg-orange-500 text-white';
      case AbsenceStatus.APPROVED: return 'bg-green-600 text-white';
      case AbsenceStatus.REJECTED: return 'bg-red-600 text-white';
      case AbsenceStatus.CANCELLED: return 'bg-gray-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  }

  getTypeBadgeStyle(type: AbsenceType): string {
    return 'bg-blue-500 text-white';
  }

  getAgentInitials(name: string | undefined): string {
    return name ? name.charAt(0) : '?';
  }

  getStatusLabel(status: AbsenceStatus): string {
    switch (status) {
      case AbsenceStatus.PENDING: return 'En attente';
      case AbsenceStatus.APPROVED: return 'Approuvée';
      case AbsenceStatus.REJECTED: return 'Rejetée';
      case AbsenceStatus.CANCELLED: return 'Annulée';
      default: return status;
    }
  }

  getTypeLabel(type: AbsenceType): string {
    switch (type) {
      case AbsenceType.SICK_LEAVE: return 'Maladie';
      case AbsenceType.ANNUAL_LEAVE: return 'Congé annuel';
      case AbsenceType.MATERNITY_LEAVE: return 'Congé maternité';
      case AbsenceType.PATERNITY_LEAVE: return 'Congé paternité';
      case AbsenceType.UNPAID_LEAVE: return 'Congé sans solde';
      case AbsenceType.SPECIAL_LEAVE: return 'Congé spécial';
      case AbsenceType.TRAINING: return 'Formation';
      case AbsenceType.FAMILY_EMERGENCY: return 'Urgence familiale';
      default: return type;
    }
  }
}
