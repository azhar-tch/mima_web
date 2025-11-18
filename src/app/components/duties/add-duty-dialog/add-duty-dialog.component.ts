import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { DutiesRequest } from '../../../models/Duties';
import { DutyType, DutyStatus } from '../../../models/enums';
import { AgentsService } from '../../../services/agents/agents.service';
import { UnitsService } from '../../../services/units/units.service';
import { AgentsResponse } from '../../../models/Agents';
import { UnitsResponse } from '../../../models/Units';

@Component({
  selector: 'app-add-duty-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-duty-dialog.component.html',
  styleUrl: './add-duty-dialog.component.css'
})
export class AddDutyDialogComponent implements OnInit {
  readonly X = X;
  readonly DutyType = DutyType;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<DutiesRequest>();

  availableAgents: AgentsResponse[] = [];
  availableUnits: UnitsResponse[] = [];
  dutyTypes = [
    DutyType.WATCH,
    DutyType.BRIDGE_WATCH,
    DutyType.ENGINE_WATCH,
    DutyType.ANCHOR_WATCH,
    DutyType.PORT_WATCH,
    DutyType.STANDBY
  ];

  formData = {
    agentTrackingId: '',
    unitTrackingId: '',
    position: '',
    dutyType: DutyType.WATCH,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    status: DutyStatus.PLANNED
  };

  errors: Record<string, string> = {};

  constructor(
    private agentsService: AgentsService,
    private unitsService: UnitsService
  ) {}

  ngOnInit(): void {
    this.loadAgents();
    this.loadUnits();
  }

  loadAgents(): void {
    this.agentsService.listAgents().subscribe({
      next: (res) => {
        this.availableAgents = res.data || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des agents', err);
        alert('Erreur lors du chargement des agents');
      }
    });
  }

  loadUnits(): void {
    this.unitsService.listUnits().subscribe({
      next: (res) => {
        this.availableUnits = res.data || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des unités', err);
        alert('Erreur lors du chargement des unités');
      }
    });
  }

  calculateDuration(): string {
    if (this.formData.startDate && this.formData.startTime && this.formData.endDate && this.formData.endTime) {
      const start = new Date(`${this.formData.startDate}T${this.formData.startTime}`);
      const end = new Date(`${this.formData.endDate}T${this.formData.endTime}`);
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
    return '0h';
  }

  handleReset(): void {
    this.formData = {
      agentTrackingId: '',
      unitTrackingId: '',
      position: '',
      dutyType: DutyType.WATCH,
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      status: DutyStatus.PLANNED
    };
    this.errors = {};
  }

  handleClose(): void {
    this.close.emit();
    this.handleReset();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.agentTrackingId.trim()) newErrors['agentTrackingId'] = 'Veuillez sélectionner un agent';
    if (!this.formData.unitTrackingId.trim()) newErrors['unitTrackingId'] = 'Veuillez sélectionner une unité';
    if (!this.formData.position.trim()) newErrors['position'] = 'Le poste est requis';
    if (!this.formData.dutyType) newErrors['dutyType'] = 'Veuillez sélectionner un type de garde';
    if (!this.formData.startDate) newErrors['startDate'] = 'La date de début est requise';
    if (!this.formData.startTime) newErrors['startTime'] = 'L\'heure de début est requise';
    if (!this.formData.endDate) newErrors['endDate'] = 'La date de fin est requise';
    if (!this.formData.endTime) newErrors['endTime'] = 'L\'heure de fin est requise';

    // Vérifier que la date de fin est après la date de début
    if (this.formData.startDate && this.formData.startTime && this.formData.endDate && this.formData.endTime) {
      const start = new Date(`${this.formData.startDate}T${this.formData.startTime}`);
      const end = new Date(`${this.formData.endDate}T${this.formData.endTime}`);
      if (end <= start) {
        newErrors['endDate'] = 'La date de fin doit être après la date de début';
      }
    }

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit(): void {
    if (this.validateForm()) {
      // Convertir les dates et heures en LocalDateTime
      const request: DutiesRequest = {
        agentTrackingId: this.formData.agentTrackingId,
        unitTrackingId: this.formData.unitTrackingId,
        position: this.formData.position,
        dutyType: this.formData.dutyType,
        startDate: `${this.formData.startDate}T${this.formData.startTime}:00`,
        endDate: `${this.formData.endDate}T${this.formData.endTime}:00`,
        status: this.formData.status
      };
      this.add.emit(request);
      this.handleReset();
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
}
