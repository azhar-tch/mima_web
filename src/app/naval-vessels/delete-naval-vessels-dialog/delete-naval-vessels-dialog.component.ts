import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { NavalVessel } from '../../models/Maritime';

@Component({
  selector: 'app-delete-naval-vessels-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-naval-vessels-dialog.component.html',
  styleUrl: './delete-naval-vessels-dialog.component.css'
})
export class DeleteNavalVesselsDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: NavalVessel;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
