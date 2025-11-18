import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { AbsencesResponse, AbsencesRequest } from '../../../models/Absences';
import { AbsenceType } from '../../../models/enums';
import { AgentsService } from '../../../services/agents/agents.service';
import { AgentsResponse } from '../../../models/Agents';

@Component({
  selector: 'app-edit-absence-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-absence-dialog.component.html',
  styleUrl: './edit-absence-dialog.component.css'
})
export class EditAbsenceDialogComponent implements OnInit, OnChanges {
  readonly X = X;
  readonly AbsenceType = AbsenceType;

  @Input() absence: AbsencesResponse | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<AbsencesRequest>();

  availableAgents: AgentsResponse[] = [];
  absenceTypes = [
    AbsenceType.SICK_LEAVE,
    AbsenceType.ANNUAL_LEAVE,
    AbsenceType.MATERNITY_LEAVE,
    AbsenceType.PATERNITY_LEAVE,
    AbsenceType.UNPAID_LEAVE,
    AbsenceType.SPECIAL_LEAVE,
    AbsenceType.TRAINING,
    AbsenceType.FAMILY_EMERGENCY
  ];

  formData: AbsencesRequest = {
    agentTrackingId: '',
    absenceType: AbsenceType.ANNUAL_LEAVE,
    startDate: '',
    endDate: '',
    status: undefined,
    reason: '',
    justification: ''
  };

  errors: Record<string, string> = {};

  constructor(private agentsService: AgentsService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['absence'] && this.absence) {
      // Extract date from LocalDateTime (2025-11-13T14:30:00 → 2025-11-13)
      this.formData = {
        agentTrackingId: this.absence.agentTrackingId || '',
        absenceType: this.absence.absenceType,
        startDate: this.absence.startDate.split('T')[0],
        endDate: this.absence.endDate.split('T')[0],
        status: this.absence.status,
        reason: this.absence.reason || '',
        justification: this.absence.justification || ''
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

  calculateDays(): number {
    if (this.formData.startDate && this.formData.endDate) {
      const start = new Date(this.formData.startDate);
      const end = new Date(this.formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  }

  handleClose() {
    this.close.emit();
    this.formData = {
      agentTrackingId: '',
      absenceType: AbsenceType.ANNUAL_LEAVE,
      startDate: '',
      endDate: '',
      reason: '',
      justification: ''
    };
    this.errors = {};
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.agentTrackingId.trim()) newErrors['agentTrackingId'] = 'Veuillez sélectionner un agent';
    if (!this.formData.absenceType) newErrors['absenceType'] = 'Veuillez sélectionner un type d\'absence';
    if (!this.formData.startDate) newErrors['startDate'] = 'La date de début est requise';
    if (!this.formData.endDate) newErrors['endDate'] = 'La date de fin est requise';
    if (!this.formData.reason || !this.formData.reason.trim()) newErrors['reason'] = 'Le motif est requis';

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      // Convertir les dates en LocalDateTime (ajouter l'heure)
      const request: AbsencesRequest = {
        ...this.formData,
        startDate: this.formData.startDate + 'T00:00:00',
        endDate: this.formData.endDate + 'T23:59:59'
      };
      this.save.emit(request);
      this.handleClose();
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
