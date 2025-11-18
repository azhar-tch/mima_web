import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { PersonnelAllowance } from '../../../models/Maritime';

@Component({
  selector: 'app-delete-personnel-allowances-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-personnel-allowances-dialog.component.html',
  styleUrl: './delete-personnel-allowances-dialog.component.css'
})
export class DeletePersonnelAllowancesDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: PersonnelAllowance;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
