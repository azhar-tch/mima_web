import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShipArrivalDepartureRequest, CommercialShip } from '../../../models/Maritime';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';

@Component({
  selector: 'app-add-ship-arrival-departures-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-ship-arrival-departures-dialog.component.html',
  styleUrl: './add-ship-arrival-departures-dialog.component.css'
})
export class AddShipArrivalDeparturesDialogComponent implements OnInit {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ShipArrivalDepartureRequest>();

  formData: ShipArrivalDepartureRequest = {
    commercialShipTrackingId: '',
    arrivalDate: '',
    portOfOrigin: '',
    cargoTypeArrival: '',
    cargoQuantityArrival: undefined,
    passengersArrival: undefined,
    crewCount: undefined,
    captainName: '',
    shippingAgent: '',
    berthingPosition: '',
    departureDate: '',
    portOfDestination: '',
    cargoTypeDeparture: '',
    cargoQuantityDeparture: undefined,
    passengersDeparture: undefined,
    servicesProvided: '',
    portDues: undefined,
    incidents: '',
    observations: ''
  };

  errors: Record<string, string> = {};

  // Liste pour les dropdowns
  commercialShips: CommercialShip[] = [];
  loadingData = false;

  constructor(private commercialShipsService: CommercialShipsService) {}

  ngOnInit() {
    this.loadDropdownData();
  }

  loadDropdownData() {
    this.loadingData = true;
    this.commercialShipsService.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.commercialShips = response.data;
        }
        this.loadingData = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des navires commerciaux:', error);
        this.loadingData = false;
      }
    });
  }

  handleReset() {
    this.formData = {
      commercialShipTrackingId: '',
      arrivalDate: '',
      portOfOrigin: '',
      cargoTypeArrival: '',
      cargoQuantityArrival: undefined,
      passengersArrival: undefined,
      crewCount: undefined,
      captainName: '',
      shippingAgent: '',
      berthingPosition: '',
      departureDate: '',
      portOfDestination: '',
      cargoTypeDeparture: '',
      cargoQuantityDeparture: undefined,
      passengersDeparture: undefined,
      servicesProvided: '',
      portDues: undefined,
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
    // Pas de validation spécifique

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
