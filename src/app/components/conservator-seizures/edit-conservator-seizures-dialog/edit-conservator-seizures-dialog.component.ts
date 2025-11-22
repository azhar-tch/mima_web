import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ConservatorSeizure, ConservatorSeizureRequest, CommercialShip } from '../../../models/Maritime';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';

@Component({
  selector: 'app-edit-conservator-seizures-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-conservator-seizures-dialog.component.html',
  styleUrl: './edit-conservator-seizures-dialog.component.css'
})
export class EditConservatorSeizuresDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: ConservatorSeizure;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ConservatorSeizureRequest>();

  formData: ConservatorSeizureRequest = {} as ConservatorSeizureRequest;
  errors: Record<string, string> = {};

  // Liste pour les dropdowns
  commercialShips: CommercialShip[] = [];
  loadingData = false;

  constructor(private commercialShipsService: CommercialShipsService) {}

  ngOnInit() {
    // Copier les données de l'item dans formData
    this.formData = { ...this.item } as any;
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

  handleClose() {
    this.close.emit();
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
      this.save.emit(this.formData);
    }
  }
}
