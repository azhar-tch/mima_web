import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ArmedGuardMissionRequest, CommercialShip, SecurityAgency } from '../../../models/Maritime';
import { MissionStatus } from '../../../models/enums';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';
import { SecurityAgenciesService } from '../../../services/security-agencies/security-agencies.service';

@Component({
  selector: 'app-add-armed-guard-missions-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-armed-guard-missions-dialog.component.html',
  styleUrl: './add-armed-guard-missions-dialog.component.css'
})
export class AddArmedGuardMissionsDialogComponent implements OnInit {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ArmedGuardMissionRequest>();

  formData: ArmedGuardMissionRequest = {
    missionNumber: '',
    commercialShipTrackingId: '',
    securityAgencyTrackingId: '',
    embarkationDate: '',
    disembarkationDate: '',
    embarkationPort: '',
    disembarkationPort: '',
    daysCount: undefined,
    personnelCount: undefined,
    patrolZone: '',
    status: MissionStatus.PLANNED,
    incidents: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  // Listes pour les dropdowns
  commercialShips: CommercialShip[] = [];
  securityAgencies: SecurityAgency[] = [];
  loadingData = false;

  constructor(
    private commercialShipsService: CommercialShipsService,
    private securityAgenciesService: SecurityAgenciesService
  ) {}

  ngOnInit() {
    this.loadDropdownData();
  }

  loadDropdownData() {
    this.loadingData = true;

    // Charger les navires commerciaux
    this.commercialShipsService.list().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.commercialShips = response.data;
        }
      },
      error: (error) => console.error('Erreur lors du chargement des navires commerciaux:', error)
    });

    // Charger les agences de sécurité
    this.securityAgenciesService.list().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.securityAgencies = response.data;
        }
        this.loadingData = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des agences de sécurité:', error);
        this.loadingData = false;
      }
    });
  }

  handleReset() {
    this.formData = {
      missionNumber: '',
      commercialShipTrackingId: '',
      securityAgencyTrackingId: '',
      embarkationDate: '',
      disembarkationDate: '',
      embarkationPort: '',
      disembarkationPort: '',
      daysCount: undefined,
      personnelCount: undefined,
      patrolZone: '',
      status: MissionStatus.PLANNED,
      incidents: '',
      observations: ''
    };
    this.errors = {};
  }

  handleClose() {
    this.close.emit();
    this.handleReset();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.missionNumber || (typeof this.formData.missionNumber === 'string' && !this.formData.missionNumber.trim())) {
      newErrors['missionNumber'] = 'Numéro de mission est requis';
    }
    if (!this.formData.embarkationDate || (typeof this.formData.embarkationDate === 'string' && !this.formData.embarkationDate.trim())) {
      newErrors['embarkationDate'] = "Date d'embarquement est requis";
    }
    if (!this.formData.embarkationPort || (typeof this.formData.embarkationPort === 'string' && !this.formData.embarkationPort.trim())) {
      newErrors['embarkationPort'] = "Port d'embarquement est requis";
    }

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.add.emit(this.formData);
      this.handleReset();
    }
  }
}
