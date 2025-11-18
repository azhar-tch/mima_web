import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, AlertTriangle } from 'lucide-angular';
import { ServicePosition } from '../../../models/HRManagement';

@Component({
  selector: 'app-delete-service-positions-confirmation',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-service-positions-confirmation.component.html',
  styleUrl: './delete-service-positions-confirmation.component.css'
})
export class DeleteServicePositionConfirmationComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() service-positions: ServicePosition | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
    this.handleClose();
  }
}
