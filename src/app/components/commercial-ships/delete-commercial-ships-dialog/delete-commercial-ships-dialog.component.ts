import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { CommercialShip } from '../../../models/Maritime';

@Component({
  selector: 'app-delete-commercial-ships-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-commercial-ships-dialog.component.html',
  styleUrl: './delete-commercial-ships-dialog.component.css'
})
export class DeleteCommercialShipsDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: CommercialShip;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
