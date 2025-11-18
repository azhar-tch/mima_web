import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { UnitsResponse } from '../../../models/Units'; // ✅ Import du bon model

@Component({
  selector: 'app-delete-unit-confirmation',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-unit-confirmation.component.html',
  styleUrl: './delete-unit-confirmation.component.css'
})
export class DeleteUnitConfirmationComponent {
  readonly X = X;

  @Input() open = false;
  @Input() unit: UnitsResponse | null = null;  // ✅ Type corrigé
  @Output() openChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<void>();

  handleOpenChange(newOpen: boolean) {
    this.openChange.emit(newOpen);
  }

  handleConfirm() {
    this.confirm.emit();
    this.handleOpenChange(false);
  }
}
