import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { CommercialShipRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-add-commercial-ships-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-commercial-ships-dialog.component.html',
  styleUrl: './add-commercial-ships-dialog.component.css'
})
export class AddCommercialShipsDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<CommercialShipRequest>();

  formData: CommercialShipRequest = {
    imoNumber: '',
    shipName: '',
    shipType: '',
    flag: '',
    mmsi: '',
    callSign: '',
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
