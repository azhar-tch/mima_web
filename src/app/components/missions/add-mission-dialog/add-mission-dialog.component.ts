import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, MapPin } from 'lucide-angular';
import { MissionsRequest } from '../../../models/Missions';
import { UnitsService } from '../../../services/units/units.service';
import { AgentsService } from '../../../services/agents/agents.service';
import { AgentsResponse } from '../../../models/Agents';
import { MarinerStatus } from '../../../models/enums';

@Component({
  selector: 'app-add-mission-dialog',
  standalone: true,
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
  agents: AgentsResponse[] = [];
  selectedUnitIds: string[] = [];
  selectedAgentIds: string[] = [];
  agentSearchTerm: string = '';
  MarinerStatus = MarinerStatus;

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

  loadAgents(searchTerm?: string) {
    this.agentsService.searchAgents(searchTerm).subscribe({
      next: (res) => {
        this.agents = res.data || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des agents', err);
      }
    });
  }

  getStatusLabel(status: MarinerStatus): string {
    switch (status) {
      case MarinerStatus.DISPONIBLE: return 'Disponible';
      case MarinerStatus.EN_MER: return 'En mer';
      case MarinerStatus.EN_GARDE: return 'En garde';
      case MarinerStatus.PERMISSION: return 'En permission';
      case MarinerStatus.ABSENT: return 'Absent';
      case MarinerStatus.EN_FORMATION: return 'En formation';
      case MarinerStatus.INDISPONIBLE: return 'Indisponible';
      default: return status;
    }
  }

  getStatusBadgeClass(status: MarinerStatus): string {
    switch (status) {
      case MarinerStatus.DISPONIBLE: return 'bg-green-100 text-green-800';
      case MarinerStatus.EN_MER: return 'bg-blue-100 text-blue-800';
      case MarinerStatus.EN_GARDE: return 'bg-purple-100 text-purple-800';
      case MarinerStatus.PERMISSION: return 'bg-yellow-100 text-yellow-800';
      case MarinerStatus.ABSENT: return 'bg-red-100 text-red-800';
      case MarinerStatus.EN_FORMATION: return 'bg-indigo-100 text-indigo-800';
      case MarinerStatus.INDISPONIBLE: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  isAgentAvailable(agent: AgentsResponse): boolean {
    return agent.status === MarinerStatus.DISPONIBLE;
  }

  onAgentSearch() {
    this.loadAgents(this.agentSearchTerm);
  }

  clearAgentSearch() {
    this.agentSearchTerm = '';
    this.loadAgents();
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
    this.agentSearchTerm = '';
    this.errors = {};
    this.loadAgents(); // Recharger tous les agents
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
