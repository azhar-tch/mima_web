import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { PALEntryExit } from '../../../models/Maritime';

@Component({
  selector: 'app-delete-pal-entry-exits-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-pal-entry-exits-dialog.component.html',
  styleUrl: './delete-pal-entry-exits-dialog.component.css'
})
export class DeletePalEntryExitsDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: PALEntryExit;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
