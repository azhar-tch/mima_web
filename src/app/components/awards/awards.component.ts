import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { AwardsService } from '../../services/awards/awards.service';
import { Award, AwardRequest } from '../../models/HRManagement';
// TODO: Create missing dialog components
// import { AddAwardDialogComponent } from './add-awards-dialog/add-awards-dialog.component';
// import { EditAwardDialogComponent } from './edit-awards-dialog/edit-awards-dialog.component';
// import { AwardDetailsDialogComponent } from './awards-details-dialog/awards-details-dialog.component';
// import { DeleteAwardConfirmationComponent } from './delete-awards-confirmation/delete-awards-confirmation.component';

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    // TODO: Uncomment when dialog components are created
    // AddAwardDialogComponent,
    // EditAwardDialogComponent,
    // AwardDetailsDialogComponent,
    // DeleteAwardConfirmationComponent
  ],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.css'
})
export class AwardsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  awards: Award[] = [];
  searchTerm = '';
  isLoading = false;

  showAddDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;
  showDetailsDialog = false;
  selectedAward: Award | null = null;

  constructor(private awardsService: AwardsService) {}

  ngOnInit() {
    this.loadAwards();
  }

  loadAwards() {
    this.isLoading = true;
    this.awardsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.awards = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading awards:', error);
        alert('Erreur lors du chargement des récompenses');
        this.isLoading = false;
      }
    });
  }

  get filteredAwards() {
    if (!this.searchTerm) return this.awards;
    const term = this.searchTerm.toLowerCase();
    return this.awards.filter(award =>
      award.awardName.toLowerCase().includes(term) ||
      (award.description && award.description.toLowerCase().includes(term))
    );
  }

  handleAddAward(newAward: AwardRequest): void {
    this.awardsService.create(newAward).subscribe({
      next: (res) => {
        if (res.data) {
          this.awards = [...this.awards, res.data];
        }
        this.showAddDialog = false;
        alert('Récompense créée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la création de la récompense', err);
        alert('Erreur lors de la création de la récompense');
      }
    });
  }

  handleEditAward(updatedAward: AwardRequest): void {
    if (!this.selectedAward) return;

    this.awardsService.update(this.selectedAward.trackingId, updatedAward).subscribe({
      next: (res) => {
        if (res.data) {
          this.awards = this.awards.map(g =>
            g.trackingId === this.selectedAward!.trackingId ? res.data! : g
          );
        }
        this.showEditDialog = false;
        this.selectedAward = null;
        alert('Récompense modifiée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la modification de la récompense', err);
        alert('Erreur lors de la modification de la récompense');
      }
    });
  }

  handleDeleteAward(): void {
    if (!this.selectedAward) return;

    this.awardsService.delete(this.selectedAward.trackingId).subscribe({
      next: () => {
        this.awards = this.awards.filter(g => g.trackingId !== this.selectedAward!.trackingId);
        this.showDeleteDialog = false;
        this.selectedAward = null;
        alert('Récompense supprimée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la récompense', err);
        alert('Erreur lors de la suppression de la récompense');
      }
    });
  }

  openAddAwardDialog(): void {
    this.showAddDialog = true;
  }

  openEditAwardDialog(award: Award): void {
    this.selectedAward = award;
    this.showEditDialog = true;
  }

  openDeleteAwardDialog(award: Award): void {
    this.selectedAward = award;
    this.showDeleteDialog = true;
  }

  openAwardDetailsDialog(award: Award): void {
    this.selectedAward = award;
    this.showDetailsDialog = true;
  }
}
