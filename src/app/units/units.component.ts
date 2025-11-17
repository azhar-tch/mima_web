import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2 } from 'lucide-angular';
import { AddUnitDialogComponent } from './add-unit-dialog/add-unit-dialog.component';
import { EditUnitDialogComponent } from './edit-unit-dialog/edit-unit-dialog.component';
import { DeleteUnitConfirmationComponent } from './delete-unit-confirmation/delete-unit-confirmation.component';
import { UnitDetailsDialogComponent } from './unit-details-dialog/unit-details-dialog.component';
import { UnitsService } from '../services/units/units.service';
import { UnitsResponse, UnitsRequest, Units } from '../models/Units';

@Component({
  selector: 'app-units',
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    AddUnitDialogComponent,
    EditUnitDialogComponent,
    DeleteUnitConfirmationComponent,
    UnitDetailsDialogComponent
  ],
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;

  searchTerm = '';
  showAddDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;
  showDetailsDialog = false;
  selectedUnit: UnitsResponse | null = null;

  units: UnitsResponse[] = [];

  constructor(private unitsService: UnitsService) {}

  ngOnInit() {
    this.loadUnits();
  }

  loadUnits() {
    this.unitsService.listUnits().subscribe({
      next: res => this.units = res.data,
      error: err => console.error('Erreur lors du chargement des unités', err)
    });
  }

  get filteredUnits() {
    return this.units.filter(unit =>
      unit.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (unit.chiefName || '').toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddDialog() { this.showAddDialog = true; }
  openEditDialog(unit: UnitsResponse) { this.selectedUnit = { ...unit }; this.showEditDialog = true; }
  openDeleteDialog(unit: UnitsResponse) { this.selectedUnit = unit; this.showDeleteDialog = true; }
  openDetailsDialog(unit: UnitsResponse) { this.selectedUnit = unit; this.showDetailsDialog = true; }

  onUnitAdded(unit: UnitsResponse) {
    this.units.push(unit);
    this.showAddDialog = false;
  }

  onUnitUpdated(unit: Units) {
  if (!unit.trackingId) return;
  const request: UnitsRequest = {
    name: unit.name,
    description: unit.description,
    type: unit.type,
    chiefTrackingId: unit.chiefTrackingId,
    status: unit.status
  };

  this.unitsService.updateUnit(unit.trackingId, request).subscribe({
    next: res => {
      const index = this.units.findIndex(u => u.trackingId === res.data.trackingId);
      if (index !== -1) this.units[index] = res.data;
      this.showEditDialog = false;
      this.selectedUnit = null;
    },
    error: err => console.error('Erreur lors de la mise à jour de l’unité', err)
  });
}

  onUnitDeleted() {
    if (!this.selectedUnit?.trackingId) return;
    this.unitsService.deleteUnit(this.selectedUnit.trackingId).subscribe({
      next: () => {
        this.units = this.units.filter(u => u.trackingId !== this.selectedUnit!.trackingId);
        this.showDeleteDialog = false;
        this.selectedUnit = null;
      },
      error: err => console.error('Erreur lors de la suppression de l’unité', err)
    });
  }
}
