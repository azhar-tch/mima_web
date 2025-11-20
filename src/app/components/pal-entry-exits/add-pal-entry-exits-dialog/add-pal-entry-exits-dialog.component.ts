import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { PALEntryExitRequest, CommercialShip } from '../../../models/Maritime';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';

@Component({
  selector: 'app-add-pal-entry-exits-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-pal-entry-exits-dialog.component.html',
  styleUrl: './add-pal-entry-exits-dialog.component.css'
})
export class AddPalEntryExitsDialogComponent implements OnInit {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<PALEntryExitRequest>();

  formData: PALEntryExitRequest = {
    commercialShipTrackingId: '',
    entryDate: '',
    entryReason: '',
    anchorageZone: '',
    entryAuthorizationNumber: '',
    authorizingAuthority: '',
    exitDate: '',
    exitReason: '',
    exitAuthorizationNumber: '',
    servicesProvided: '',
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
      entryDate: '',
      entryReason: '',
      anchorageZone: '',
      entryAuthorizationNumber: '',
      authorizingAuthority: '',
      exitDate: '',
      exitReason: '',
      exitAuthorizationNumber: '',
      servicesProvided: '',
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
      newErrors['commercialShipTrackingId'] = "ID Navire commercial est requis";
    }
    if (!this.formData.entryDate || (typeof this.formData.entryDate === 'string' && !this.formData.entryDate.trim())) {
      newErrors['entryDate'] = "Date d'entrée est requis";
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
