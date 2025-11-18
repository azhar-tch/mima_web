import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { EscortMission } from '../../../models/Maritime';

@Component({
  selector: 'app-delete-escort-missions-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-escort-missions-dialog.component.html',
  styleUrl: './delete-escort-missions-dialog.component.css'
})
export class DeleteEscortMissionsDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: EscortMission;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
