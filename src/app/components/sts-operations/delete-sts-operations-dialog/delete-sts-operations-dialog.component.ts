import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { STSOperation } from '../../../models/Maritime';

@Component({
  selector: 'app-delete-sts-operations-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-sts-operations-dialog.component.html',
  styleUrl: './delete-sts-operations-dialog.component.css'
})
export class DeleteStsOperationsDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: STSOperation;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
