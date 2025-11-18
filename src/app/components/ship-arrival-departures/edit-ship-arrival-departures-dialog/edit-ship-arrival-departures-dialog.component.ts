import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShipArrivalDeparture, ShipArrivalDepartureRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-edit-ship-arrival-departures-dialog',
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

  ngOnInit() {
    // Copier les données de l'item dans formData
    this.formData = { ...this.item } as any;
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
