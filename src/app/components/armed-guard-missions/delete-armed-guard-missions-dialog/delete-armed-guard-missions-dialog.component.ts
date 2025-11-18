import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { ArmedGuardMission } from '../../../models/Maritime';

@Component({
  selector: 'app-delete-armed-guard-missions-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-armed-guard-missions-dialog.component.html',
  styleUrl: './delete-armed-guard-missions-dialog.component.css'
})
export class DeleteArmedGuardMissionsDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: ArmedGuardMission;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
