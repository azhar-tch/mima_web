import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, AlertTriangle } from 'lucide-angular';
import { OtherPosition } from '../../models/HRManagement';

@Component({
  selector: 'app-delete-other-positions-confirmation',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-other-positions-confirmation.component.html',
  styleUrl: './delete-other-positions-confirmation.component.css'
})
export class DeleteOtherPositionConfirmationComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() other-positions: OtherPosition | null = null;
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
