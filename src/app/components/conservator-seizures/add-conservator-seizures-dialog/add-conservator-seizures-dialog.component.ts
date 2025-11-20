import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ConservatorSeizureRequest, CommercialShip } from '../../../models/Maritime';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';

@Component({
  selector: 'app-add-conservator-seizures-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-conservator-seizures-dialog.component.html',
  styleUrl: './add-conservator-seizures-dialog.component.css'
})
export class AddConservatorSeizuresDialogComponent implements OnInit {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<ConservatorSeizureRequest>();

  formData: ConservatorSeizureRequest = {
    commercialShipTrackingId: '',
    seizureDate: '',
    seizingAuthority: '',
    seizureOrderNumber: '',
    seizureReason: '',
    seizureType: '',
    claimAmount: undefined,
    seizureLocation: '',
    creditorName: '',
    creditorLegalRepresentative: '',
    bailiffName: '',
    shipGuardian: '',
    releaseDate: '',
    releaseReason: '',
    releaseOrderNumber: '',
    amountPaid: undefined,
    status: '',
    relatedDocuments: '',
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
      seizureDate: '',
      seizingAuthority: '',
      seizureOrderNumber: '',
      seizureReason: '',
      seizureType: '',
      claimAmount: undefined,
      seizureLocation: '',
      creditorName: '',
      creditorLegalRepresentative: '',
      bailiffName: '',
      shipGuardian: '',
      releaseDate: '',
      releaseReason: '',
      releaseOrderNumber: '',
      amountPaid: undefined,
      status: '',
      relatedDocuments: '',
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
      newErrors['commercialShipTrackingId'] = "ID Navire commercial est requis";
    }
    if (!this.formData.seizureDate || (typeof this.formData.seizureDate === 'string' && !this.formData.seizureDate.trim())) {
      newErrors['seizureDate'] = "Date de saisie est requis";
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
