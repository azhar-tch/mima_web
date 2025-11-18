import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, AlertTriangle } from 'lucide-angular';
import { HRGrade } from '../../../models/HRManagement';

@Component({
  selector: 'app-delete-grade-confirmation',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-grade-confirmation.component.html',
  styleUrl: './delete-grade-confirmation.component.css'
})
export class DeleteGradeConfirmationComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() grade: HRGrade | null = null;
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
