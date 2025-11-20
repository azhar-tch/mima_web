import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShipProvisioningRequest, CommercialShip } from '../../../models/Maritime';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';

@Component({
  selector: 'app-add-ship-provisionings-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-ship-provisionings-dialog.component.html',
  styleUrl: './add-ship-provisionings-dialog.component.css'
})
export class AddShipProvisioningsDialogComponent implements OnInit {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ShipProvisioningRequest>();

  formData: ShipProvisioningRequest = {
    commercialShipTrackingId: '',
    provisioningDate: '',
    provisioningType: '',
    supplierName: '',
    supplyVesselName: '',
    supplyVesselImo: '',
    productType: '',
    quantity: undefined,
    unit: '',
    amount: undefined,
    startTime: '',
    endTime: '',
    provisioningPoint: '',
    hasDelay: undefined,
    delayDurationHours: undefined,
    delayReason: '',
    delayPenalty: undefined,
    correctiveActions: '',
    isOnTime: undefined,
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
        if (response.success && response.data) {
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
      provisioningDate: '',
      provisioningType: '',
      supplierName: '',
      supplyVesselName: '',
      supplyVesselImo: '',
      productType: '',
      quantity: undefined,
      unit: '',
      amount: undefined,
      startTime: '',
      endTime: '',
      provisioningPoint: '',
      hasDelay: undefined,
      delayDurationHours: undefined,
      delayReason: '',
      delayPenalty: undefined,
      correctiveActions: '',
      isOnTime: undefined,
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
    if (!this.formData.commercialShipTrackingId || (typeof this.formData.commercialShipTrackingId === 'string' && !this.formData.commercialShipTrackingId.trim())) {
      newErrors['commercialShipTrackingId'] = 'Navire commercial est requis';
    }
    if (!this.formData.provisioningDate || (typeof this.formData.provisioningDate === 'string' && !this.formData.provisioningDate.trim())) {
      newErrors['provisioningDate'] = "Date d'avitaillement est requis";
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
