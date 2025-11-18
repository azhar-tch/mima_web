import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, AlertTriangle } from 'lucide-angular';
import { HRFunction } from '../../../models/HRManagement';

@Component({
  selector: 'app-delete-function-confirmation',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-hr-functions-confirmation/delete-hr-functions-confirmation.component.html',
  styleUrl: './delete-hr-functions-confirmation/delete-hr-functions-confirmation.component.css'
})
export class DeleteFunctionConfirmationComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() hr: HRFunction | null = null;
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
