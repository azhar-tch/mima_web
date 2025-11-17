import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { DutiesResponse } from '../../../models/Duties';

@Component({
  selector: 'app-delete-duty-confirmation',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-duty-confirmation.component.html',
  styleUrl: './delete-duty-confirmation.component.css'
})
export class DeleteDutyConfirmationComponent {
  readonly X = X;

  @Input() duty: DutiesResponse | null = null;
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
