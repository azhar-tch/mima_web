import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, MapPin } from 'lucide-angular';
import { MissionsRequest } from '../../models/Missions';
import { UnitsService } from '../../services/units/units.service';
import { AgentsService } from '../../services/agents/agents.service';

@Component({
  selector: 'app-add-mission-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-mission-dialog.component.html',
  styleUrl: './add-mission-dialog.component.css'
})
export class AddMissionDialogComponent implements OnInit {
  readonly X = X;
  readonly MapPin = MapPin;

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<MissionsRequest>();

  units: { trackingId: string; name: string }[] = [];
  agents: { trackingId: string; firstName: string; lastName: string }[] = [];
  selectedUnitIds: string[] = [];
  selectedAgentIds: string[] = [];

  formData: MissionsRequest = {
    type: '',
    title: '',
    location: '',
    shipName: '',
    objective: '',
    plannedStartDate: '',
    plannedEndDate: ''
  };

  errors: Record<string, string> = {};

  constructor(
    private unitsService: UnitsService,
    private agentsService: AgentsService
  ) {}

  ngOnInit(): void {
    this.loadUnits();
    this.loadAgents();
  }

  loadUnits() {
    this.unitsService.listUnits().subscribe({
      next: (res) => {
        this.units = (res.data || []).map(unit => ({
          trackingId: unit.trackingId,
          name: unit.name
        }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des unités', err);
      }
    });
  }

  loadAgents() {
    this.agentsService.listAgents().subscribe({
      next: (res) => {
        this.agents = (res.data || []).map(agent => ({
          trackingId: agent.trackingId,
          firstName: agent.firstName,
          lastName: agent.lastName
        }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des agents', err);
      }
    });
  }

  onUnitChange(event: Event, unitId: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.selectedUnitIds.includes(unitId)) {
        this.selectedUnitIds.push(unitId);
      }
    } else {
      this.selectedUnitIds = this.selectedUnitIds.filter(id => id !== unitId);
    }
  }

  onAgentChange(event: Event, agentId: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.selectedAgentIds.includes(agentId)) {
        this.selectedAgentIds.push(agentId);
      }
    } else {
      this.selectedAgentIds = this.selectedAgentIds.filter(id => id !== agentId);
    }
  }

  handleReset() {
    this.formData = {
      type: '',
      title: '',
      location: '',
      shipName: '',
      objective: '',
      plannedStartDate: '',
      plannedEndDate: ''
    };
    this.selectedUnitIds = [];
    this.selectedAgentIds = [];
    this.errors = {};
  }

  handleOpenChange(newOpen: boolean) {
    this.openChange.emit(newOpen);
    if (!newOpen) {
      this.handleReset();
    }
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!this.formData.type?.trim()) {
      newErrors['type'] = 'Le type est requis';
    }
    if (!this.formData.title?.trim()) {
      newErrors['title'] = 'Le titre est requis';
    }
    if (!this.formData.location?.trim()) {
      newErrors['location'] = 'La localisation est requise';
    }
    if (!this.formData.plannedStartDate) {
      newErrors['plannedStartDate'] = 'La date de début est requise';
    }
    if (!this.formData.plannedEndDate) {
      newErrors['plannedEndDate'] = 'La date de fin est requise';
    }

    // Valider qu'au moins une unité OU un agent est sélectionné
    if (this.selectedUnitIds.length === 0 && this.selectedAgentIds.length === 0) {
      newErrors['units'] = 'Veuillez sélectionner au moins une unité ou un agent';
    }

    // Valider que la date de fin est après la date de début
    if (this.formData.plannedStartDate && this.formData.plannedEndDate) {
      const startDate = new Date(this.formData.plannedStartDate);
      const endDate = new Date(this.formData.plannedEndDate);
      if (endDate < startDate) {
        newErrors['plannedEndDate'] = 'La date de fin doit être après la date de début';
      }
    }

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      // Ajouter les IDs sélectionnés au formData
      this.formData.unitTrackingIds = this.selectedUnitIds.length > 0 ? this.selectedUnitIds : undefined;
      this.formData.agentTrackingIds = this.selectedAgentIds.length > 0 ? this.selectedAgentIds : undefined;

      this.add.emit(this.formData);
      this.handleReset();
      this.handleOpenChange(false);
    }
  }
}
