import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, AlertTriangle } from 'lucide-angular';
import { Award } from '../../../models/HRManagement';

@Component({
  selector: 'app-delete-award-confirmation',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-award-confirmation.component.html',
  styleUrl: './delete-award-confirmation.component.css'
})
export class DeleteAwardConfirmationComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() award: Award | null = null;
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
