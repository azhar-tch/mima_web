import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShipIncidentRequest, CommercialShip, NavalVessel } from '../../../models/Maritime';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';
import { NavalVesselsService } from '../../../services/naval-vessels/naval-vessels.service';

@Component({
  selector: 'app-add-ship-incidents-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-ship-incidents-dialog.component.html',
  styleUrl: './add-ship-incidents-dialog.component.css'
})
export class AddShipIncidentsDialogComponent implements OnInit {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ShipIncidentRequest>();

  formData: ShipIncidentRequest = {
    commercialShipTrackingId: '',
    incidentDate: '',
    eventType: '',
    incidentType: '',
    severity: '',
    location: '',
    latitude: undefined,
    longitude: undefined,
    maritimeZone: '',
    description: '',
    causes: '',
    casualties: '',
    materialDamage: '',
    pollutionOccurred: undefined,
    pollutionType: '',
    respondingAgencies: '',
    assistingNavalVesselTrackingId: '',
    immediateMeasures: '',
    resolutionDate: '',
    status: '',
    reportEstablished: undefined,
    reportReference: '',
    notifiedAuthorities: '',
    investigationOngoing: undefined,
    recommendations: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  // Liste pour les dropdowns
  commercialShips: CommercialShip[] = [];
  navalVessels: NavalVessel[] = [];
  loadingData = false;

  constructor(
    private commercialShipsService: CommercialShipsService,
    private navalVesselsService: NavalVesselsService
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
        this.loadingData = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des navires navals:', error);
        this.loadingData = false;
      }
    });
  }

  handleReset() {
    this.formData = {
      commercialShipTrackingId: '',
      incidentDate: '',
      eventType: '',
      incidentType: '',
      severity: '',
      location: '',
      latitude: undefined,
      longitude: undefined,
      maritimeZone: '',
      description: '',
      causes: '',
      casualties: '',
      materialDamage: '',
      pollutionOccurred: undefined,
      pollutionType: '',
      respondingAgencies: '',
      assistingNavalVesselTrackingId: '',
      immediateMeasures: '',
      resolutionDate: '',
      status: '',
      reportEstablished: undefined,
      reportReference: '',
      notifiedAuthorities: '',
      investigationOngoing: undefined,
      recommendations: '',
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
    if (!this.formData.commercialShipTrackingId || (typeof this.formData.commercialShipTrackingId === 'string' && !this.formData.commercialShipTrackingId.trim())) {
      newErrors['commercialShipTrackingId'] = 'Navire commercial est requis';
    }
    if (!this.formData.incidentDate || (typeof this.formData.incidentDate === 'string' && !this.formData.incidentDate.trim())) {
      newErrors['incidentDate'] = "Date de l'incident est requis";
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
