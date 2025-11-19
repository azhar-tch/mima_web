import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { CommercialShipRequest } from '../../../models/Maritime';
import { ShipStatus } from '../../../models/enums';

@Component({
  selector: 'app-add-commercial-ships-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-commercial-ships-dialog.component.html',
  styleUrl: './add-commercial-ships-dialog.component.css'
})
export class AddCommercialShipsDialogComponent {
  readonly X = X;
  readonly ShipStatus = ShipStatus;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<CommercialShipRequest>();

  statusOptions = [
    { value: ShipStatus.IN_PORT, label: 'Au port' },
    { value: ShipStatus.AT_SEA, label: 'En mer' },
    { value: ShipStatus.UNDER_ESCORT, label: 'En escorte' },
    { value: ShipStatus.WAITING, label: 'En attente' },
    { value: ShipStatus.LOADING, label: 'En chargement' },
    { value: ShipStatus.UNLOADING, label: 'En déchargement' },
    { value: ShipStatus.IN_MAINTENANCE, label: 'En maintenance' },
    { value: ShipStatus.IN_REPAIR, label: 'En réparation' },
    { value: ShipStatus.OTHER, label: 'Autre' }
  ];

  formData: CommercialShipRequest = {
    imoNumber: '',
    shipName: '',
    shipType: '',
    flag: '',
    mmsi: '',
    callSign: '',
    grossTonnage: undefined,
    deadWeight: undefined,
    length: undefined,
    width: undefined,
    draft: undefined,
    yearBuilt: undefined,
    shipOwner: '',
    operator: '',
    lastPort: '',
    nextPort: '',
    cargoType: '',
    arrivalDate: '',
    departureDate: '',
    status: ShipStatus.IN_PORT,
    observations: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      imoNumber: '',
      shipName: '',
      shipType: '',
      flag: '',
      mmsi: '',
      callSign: '',
      grossTonnage: undefined,
      deadWeight: undefined,
      length: undefined,
      width: undefined,
      draft: undefined,
      yearBuilt: undefined,
      shipOwner: '',
      operator: '',
      lastPort: '',
      nextPort: '',
      cargoType: '',
      arrivalDate: '',
      departureDate: '',
      status: ShipStatus.IN_PORT,
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
    if (!this.formData.imoNumber || (typeof this.formData.imoNumber === 'string' && !this.formData.imoNumber.trim())) {
      newErrors['imoNumber'] = 'Numéro IMO est requis';
    }
    if (!this.formData.shipName || (typeof this.formData.shipName === 'string' && !this.formData.shipName.trim())) {
      newErrors['shipName'] = 'Nom du navire est requis';
    }
    if (!this.formData.shipType || (typeof this.formData.shipType === 'string' && !this.formData.shipType.trim())) {
      newErrors['shipType'] = 'Type de navire est requis';
    }
    if (!this.formData.flag || (typeof this.formData.flag === 'string' && !this.formData.flag.trim())) {
      newErrors['flag'] = 'Pavillon est requis';
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
