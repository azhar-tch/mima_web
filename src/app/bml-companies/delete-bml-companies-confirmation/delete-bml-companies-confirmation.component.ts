import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, AlertTriangle } from 'lucide-angular';
import { BMLCompany } from '../../models/HRManagement';

@Component({
  selector: 'app-delete-bml-companies-confirmation',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-bml-companies-confirmation.component.html',
  styleUrl: './delete-bml-companies-confirmation.component.css'
})
export class DeleteBmlCompanyConfirmationComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() bml-companies: BMLCompany | null = null;
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
