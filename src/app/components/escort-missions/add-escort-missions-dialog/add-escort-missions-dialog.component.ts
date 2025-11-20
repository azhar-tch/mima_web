import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { EscortMissionRequest, CommercialShip, NavalVessel, SecurityAgency } from '../../../models/Maritime';
import { MissionStatus, EscortType } from '../../../models/enums';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';
import { NavalVesselsService } from '../../../services/naval-vessels/naval-vessels.service';
import { SecurityAgenciesService } from '../../../services/security-agencies/security-agencies.service';
import { AgentsService } from '../../../services/agents/agents.service';

@Component({
  selector: 'app-add-escort-missions-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-escort-missions-dialog.component.html',
  styleUrl: './add-escort-missions-dialog.component.css'
})
export class AddEscortMissionsDialogComponent implements OnInit {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<EscortMissionRequest>();

  formData: EscortMissionRequest = {
    missionNumber: '',
    commercialShipTrackingId: '',
    securityAgencyTrackingId: '',
    navalVesselTrackingId: '',
    commanderTrackingId: '',
    secondaryVesselTrackingId: '',
    vedettes: '',
    startDate: '',
    endDate: '',
    escortType: EscortType.STANDARD,
    departurePoint: '',
    arrivalPoint: '',
    distance: undefined,
    escortZone: '',
    status: MissionStatus.PLANNED,
    incidents: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  // Listes pour les dropdowns
  commercialShips: CommercialShip[] = [];
  navalVessels: NavalVessel[] = [];
  securityAgencies: SecurityAgency[] = [];
  agents: { trackingId: string; firstName: string; lastName: string }[] = [];
  agentSearchTerm: string = '';
  loadingData = false;

  constructor(
    private commercialShipsService: CommercialShipsService,
    private navalVesselsService: NavalVesselsService,
    private securityAgenciesService: SecurityAgenciesService,
    private agentsService: AgentsService
  ) {}

  ngOnInit() {
    this.loadDropdownData();
  }

  loadDropdownData() {
    this.loadingData = true;

    // Charger les navires commerciaux
    this.commercialShipsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.commercialShips = response.data;
        }
      },
      error: (error) => console.error('Erreur lors du chargement des navires commerciaux:', error)
    });

    // Charger les navires navals
    this.navalVesselsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.navalVessels = response.data;
        }
      },
      error: (error) => console.error('Erreur lors du chargement des navires navals:', error)
    });

    // Charger les agences de sécurité
    this.securityAgenciesService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.securityAgencies = response.data;
        }
        this.loadingData = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des agences de sécurité:', error);
        this.loadingData = false;
      }
    });

    // Charger les agents
    this.loadAgents();
  }

  loadAgents(searchTerm?: string) {
    this.agentsService.searchAgents(searchTerm).subscribe({
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

  onAgentSearch() {
    this.loadAgents(this.agentSearchTerm);
  }

  clearAgentSearch() {
    this.agentSearchTerm = '';
    this.loadAgents();
  }

  handleReset() {
    this.formData = {
      missionNumber: '',
      commercialShipTrackingId: '',
      securityAgencyTrackingId: '',
      navalVesselTrackingId: '',
      commanderTrackingId: '',
      secondaryVesselTrackingId: '',
      vedettes: '',
      startDate: '',
      endDate: '',
      escortType: EscortType.STANDARD,
      departurePoint: '',
      arrivalPoint: '',
      distance: undefined,
      escortZone: '',
      status: MissionStatus.PLANNED,
      incidents: '',
      observations: ''
    };
    this.agentSearchTerm = '';
    this.errors = {};
    this.loadAgents(); // Recharger tous les agents
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
    if (!this.formData.startDate || (typeof this.formData.startDate === 'string' && !this.formData.startDate.trim())) {
      newErrors['startDate'] = 'Date de début est requis';
    }
    if (!this.formData.departurePoint || (typeof this.formData.departurePoint === 'string' && !this.formData.departurePoint.trim())) {
      newErrors['departurePoint'] = 'Point de départ est requis';
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
