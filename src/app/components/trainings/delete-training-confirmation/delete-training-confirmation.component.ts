import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, AlertTriangle } from 'lucide-angular';
import { Training } from '../../../models/HRManagement';

@Component({
  selector: 'app-delete-training-confirmation',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-training-confirmation.component.html',
  styleUrl: './delete-training-confirmation.component.css'
})
export class DeleteTrainingConfirmationComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() training: Training | null = null;
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
