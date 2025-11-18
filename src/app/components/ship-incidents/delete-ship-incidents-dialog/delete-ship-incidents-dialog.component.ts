import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { ShipIncident } from '../../../models/Maritime';

@Component({
  selector: 'app-delete-ship-incidents-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-ship-incidents-dialog.component.html',
  styleUrl: './delete-ship-incidents-dialog.component.css'
})
export class DeleteShipIncidentsDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: ShipIncident;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
