import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { SecurityAgency } from '../../../models/Maritime';

@Component({
  selector: 'app-delete-security-agencies-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-security-agencies-dialog.component.html',
  styleUrl: './delete-security-agencies-dialog.component.css'
})
export class DeleteSecurityAgenciesDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: SecurityAgency;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
