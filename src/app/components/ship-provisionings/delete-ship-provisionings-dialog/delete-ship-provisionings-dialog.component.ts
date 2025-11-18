import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { ShipProvisioning } from '../../../models/Maritime';

@Component({
  selector: 'app-delete-ship-provisionings-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-ship-provisionings-dialog.component.html',
  styleUrl: './delete-ship-provisionings-dialog.component.css'
})
export class DeleteShipProvisioningsDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: ShipProvisioning;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
