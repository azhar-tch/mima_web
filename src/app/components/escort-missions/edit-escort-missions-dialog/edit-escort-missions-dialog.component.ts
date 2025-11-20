import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { EscortMission, EscortMissionRequest, CommercialShip, NavalVessel, SecurityAgency } from '../../../models/Maritime';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';
import { NavalVesselsService } from '../../../services/naval-vessels/naval-vessels.service';
import { SecurityAgenciesService } from '../../../services/security-agencies/security-agencies.service';
import { AgentsService } from '../../../services/agents/agents.service';

@Component({
  selector: 'app-edit-escort-missions-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-escort-missions-dialog.component.html',
  styleUrl: './edit-escort-missions-dialog.component.css'
})
export class EditEscortMissionsDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: EscortMission;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<EscortMissionRequest>();

  formData: EscortMissionRequest = {} as EscortMissionRequest;
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
    // Copier les données de l'item dans formData
    this.formData = { ...this.item } as any;
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

  handleClose() {
    this.close.emit();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    // Ajoutez vos validations ici
    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.save.emit(this.formData);
    }
  }
}
