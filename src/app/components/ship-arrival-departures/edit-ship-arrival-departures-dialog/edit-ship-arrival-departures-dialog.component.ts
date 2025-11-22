import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShipArrivalDeparture, ShipArrivalDepartureRequest, CommercialShip } from '../../../models/Maritime';
import { CommercialShipsService } from '../../../services/commercial-ships/commercial-ships.service';

@Component({
  selector: 'app-edit-ship-arrival-departures-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-ship-arrival-departures-dialog.component.html',
  styleUrl: './edit-ship-arrival-departures-dialog.component.css'
})
export class EditShipArrivalDeparturesDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: ShipArrivalDeparture;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ShipArrivalDepartureRequest>();

  formData: ShipArrivalDepartureRequest = {} as ShipArrivalDepartureRequest;
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
    // Pas de validation spécifique

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.save.emit(this.formData);
    }
  }
}
