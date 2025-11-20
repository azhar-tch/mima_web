import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ArmedGuardMission, ArmedGuardMissionRequest, CommercialShip, SecurityAgency } from '../../../models/Maritime';
import { MissionStatus } from '../../../models/enums';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';
import { SecurityAgenciesService } from '../../../services/security-agencies/security-agencies.service';

@Component({
  selector: 'app-edit-armed-guard-missions-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-armed-guard-missions-dialog.component.html',
  styleUrl: './edit-armed-guard-missions-dialog.component.css'
})
export class EditArmedGuardMissionsDialogComponent implements OnInit {
  readonly X = X;
  readonly MissionStatus = MissionStatus;

  statusOptions = [
    { value: MissionStatus.PLANNED, label: 'Planifiée' },
    { value: MissionStatus.IN_PROGRESS, label: 'En cours' },
    { value: MissionStatus.COMPLETED, label: 'Terminée' },
    { value: MissionStatus.CANCELLED, label: 'Annulée' }
  ];

  @Input() item!: ArmedGuardMission;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ArmedGuardMissionRequest>();

  formData: ArmedGuardMissionRequest = {} as ArmedGuardMissionRequest;
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
