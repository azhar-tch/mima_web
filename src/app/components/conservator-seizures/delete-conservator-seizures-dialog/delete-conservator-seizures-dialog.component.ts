import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';
import { ConservatorSeizure } from '../../../models/Maritime';

@Component({
  selector: 'app-delete-conservator-seizures-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-conservator-seizures-dialog.component.html',
  styleUrl: './delete-conservator-seizures-dialog.component.css'
})
export class DeleteConservatorSeizuresDialogComponent {
  readonly X = X;
  readonly AlertTriangle = AlertTriangle;

  @Input() item!: ConservatorSeizure;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
