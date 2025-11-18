import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { ShipArrivalDeparture } from '../../../models/Maritime';

@Component({
  selector: 'app-delete-ship-arrival-departures-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-ship-arrival-departures-dialog.component.html',
  styleUrl: './delete-ship-arrival-departures-dialog.component.css'
})
export class DeleteShipArrivalDeparturesDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: ShipArrivalDeparture;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
