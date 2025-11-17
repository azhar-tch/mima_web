import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { DutiesResponse, DutiesRequest } from '../../../models/Duties';
import { DutyType, DutyStatus } from '../../../models/enums';
import { AgentsService } from '../../../services/agents/agents.service';
import { UnitsService } from '../../../services/units/units.service';
import { AgentsResponse } from '../../../models/Agents';
import { UnitsResponse } from '../../../models/Units';

@Component({
  selector: 'app-edit-duty-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-duty-dialog.component.html',
  styleUrl: './edit-duty-dialog.component.css'
})
export class EditDutyDialogComponent implements OnInit, OnChanges {
  readonly X = X;
  readonly DutyType = DutyType;
  readonly DutyStatus = DutyStatus;

  @Input() duty: DutiesResponse | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<DutiesRequest>();

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
    status: undefined as DutyStatus | undefined
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['duty'] && this.duty) {
      // Extract date and time from LocalDateTime
      const startDateTime = this.duty.startDate.split('T');
      const endDateTime = this.duty.endDate.split('T');

      this.formData = {
        agentTrackingId: this.duty.agentTrackingId || '',
        unitTrackingId: this.duty.unitTrackingId || '',
        position: this.duty.position,
        dutyType: this.duty.dutyType,
        startDate: startDateTime[0],
        startTime: startDateTime[1]?.substring(0, 5) || '',
        endDate: endDateTime[0],
        endTime: endDateTime[1]?.substring(0, 5) || '',
        status: this.duty.status
      };
    }
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

  calculateDuration(): number {
    if (this.formData.startDate && this.formData.startTime && this.formData.endDate && this.formData.endTime) {
      const start = new Date(`${this.formData.startDate}T${this.formData.startTime}`);
      const end = new Date(`${this.formData.endDate}T${this.formData.endTime}`);
      const diffMs = end.getTime() - start.getTime();
      return Math.floor(diffMs / (1000 * 60 * 60));
    }
    return 0;
  }

  handleClose() {
    this.close.emit();
    this.errors = {};
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!this.formData.agentTrackingId.trim()) newErrors['agentTrackingId'] = 'Veuillez sélectionner un agent';
    if (!this.formData.unitTrackingId.trim()) newErrors['unitTrackingId'] = 'Veuillez sélectionner une unité';
    if (!this.formData.position.trim()) newErrors['position'] = 'Le poste est requis';
    if (!this.formData.dutyType) newErrors['dutyType'] = 'Le type de garde est requis';
    if (!this.formData.startDate) newErrors['startDate'] = 'La date de début est requise';
    if (!this.formData.startTime) newErrors['startTime'] = 'L\'heure de début est requise';
    if (!this.formData.endDate) newErrors['endDate'] = 'La date de fin est requise';
    if (!this.formData.endTime) newErrors['endTime'] = 'L\'heure de fin est requise';

    // Validate end date is after start date
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

  handleSubmit() {
    if (this.validateForm()) {
      // Convert to LocalDateTime format
      const request: DutiesRequest = {
        agentTrackingId: this.formData.agentTrackingId,
        unitTrackingId: this.formData.unitTrackingId,
        position: this.formData.position,
        dutyType: this.formData.dutyType,
        startDate: `${this.formData.startDate}T${this.formData.startTime}:00`,
        endDate: `${this.formData.endDate}T${this.formData.endTime}:00`,
        status: this.formData.status
      };
      this.save.emit(request);
      this.handleClose();
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
