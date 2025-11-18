import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-delete-mission-confirmation',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-mission-confirmation.component.html',
  styleUrl: './delete-mission-confirmation.component.css'
})
export class DeleteMissionConfirmationComponent {
  readonly X = X;

  @Input() open = false;
  @Input() mission: any = null;
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
