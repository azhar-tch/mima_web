import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, MapPin } from 'lucide-angular';
import { MissionsRequest, MissionsResponse } from '../../models/Missions';
import { MissionsService } from '../../services/missions/missions.service';
import { UnitsService } from '../../services/units/units.service';
import { AgentsService } from '../../services/agents/agents.service';
import { MissionStatus } from '../../models/enums';

@Component({
  selector: 'app-edit-mission-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-mission-dialog.component.html',
  styleUrl: './edit-mission-dialog.component.css'
})
export class EditMissionDialogComponent implements OnChanges, OnInit {
  readonly X = X;
  readonly MapPin = MapPin;

  @Input() open = false;
  @Input() mission: MissionsResponse | null = null;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() missionUpdated = new EventEmitter<MissionsResponse>();

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
    plannedEndDate: '',
    status: MissionStatus.PLANNED
  };

  errors: Record<string, string> = {};

  constructor(
    private missionsService: MissionsService,
    private unitsService: UnitsService,
    private agentsService: AgentsService
  ) {}

  // Convertir la date ISO en format datetime-local
  private convertToDatetimeLocal(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Convertir datetime-local en ISO string pour le backend
  private convertToISOString(datetimeLocal: string): string {
    if (!datetimeLocal) return '';
    return new Date(datetimeLocal).toISOString();
  }

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mission'] && this.mission) {
      this.formData = {
        type: this.mission.type || '',
        title: this.mission.title || '',
        location: this.mission.location || '',
        shipName: this.mission.shipName || '',
        objective: this.mission.objective || '',
        plannedStartDate: this.convertToDatetimeLocal(this.mission.plannedStartDate || ''),
        plannedEndDate: this.convertToDatetimeLocal(this.mission.plannedEndDate || ''),
        status: this.mission.status || MissionStatus.PLANNED
      };

      // Populate selected units and agents from mission data
      this.selectedUnitIds = this.mission.unitTrackingIds || [];
      this.selectedAgentIds = this.mission.agentTrackingIds || [];

      this.errors = {};
    }
    if (changes['open'] && this.open && this.mission) {
      this.formData = {
        type: this.mission.type || '',
        title: this.mission.title || '',
        location: this.mission.location || '',
        shipName: this.mission.shipName || '',
        objective: this.mission.objective || '',
        plannedStartDate: this.convertToDatetimeLocal(this.mission.plannedStartDate || ''),
        plannedEndDate: this.convertToDatetimeLocal(this.mission.plannedEndDate || ''),
        status: this.mission.status || MissionStatus.PLANNED
      };

      // Populate selected units and agents from mission data
      this.selectedUnitIds = this.mission.unitTrackingIds || [];
      this.selectedAgentIds = this.mission.agentTrackingIds || [];

      this.errors = {};
    }
  }

  handleOpenChange(newOpen: boolean) {
    this.openChange.emit(newOpen);
    if (!newOpen) {
      this.errors = {};
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
    if (!this.mission) return;

    if (this.validateForm()) {
      // Préparer les données avec conversion des dates en ISO
      const requestData: MissionsRequest = {
        ...this.formData,
        plannedStartDate: this.convertToISOString(this.formData.plannedStartDate),
        plannedEndDate: this.convertToISOString(this.formData.plannedEndDate),
        unitTrackingIds: this.selectedUnitIds.length > 0 ? this.selectedUnitIds : undefined,
        agentTrackingIds: this.selectedAgentIds.length > 0 ? this.selectedAgentIds : undefined
      };

      console.log('📤 Données envoyées pour mise à jour:');
      console.log('  - Mission ID:', this.mission.trackingId);
      console.log('  - Request data:', JSON.stringify(requestData, null, 2));
      console.log('  - Dates converties:');
      console.log('    * plannedStartDate (form):', this.formData.plannedStartDate);
      console.log('    * plannedStartDate (ISO):', requestData.plannedStartDate);
      console.log('    * plannedEndDate (form):', this.formData.plannedEndDate);
      console.log('    * plannedEndDate (ISO):', requestData.plannedEndDate);
      console.log('  - Selected units:', this.selectedUnitIds);
      console.log('  - Selected agents:', this.selectedAgentIds);

      this.missionsService.updateMission(this.mission.trackingId, requestData).subscribe({
        next: (res) => {
          console.log('✅ Mise à jour réussie:', res);
          if (res.data) {
            this.missionUpdated.emit(res.data);
          }
          this.handleOpenChange(false);
        },
        error: (err) => {
          console.error('❌ Erreur lors de la mise à jour de la mission:', err);
          console.error('❌ Error status:', err.status);
          console.error('❌ Error response:', err.error);
          console.error('❌ Error message:', err.error?.message || err.message);
          console.error('❌ Full error object:', JSON.stringify(err.error, null, 2));

          const errorMsg = err.error?.message || err.message || 'Erreur inconnue';
          alert(`Erreur lors de la mise à jour de la mission:\n${errorMsg}`);
        }
      });
    }
  }
}
