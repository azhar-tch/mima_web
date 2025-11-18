import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

export interface Rule {
  id: string;
  title: string;
  value: number;
  unit: string;
  description: string;
}

@Component({
  selector: 'app-delete-rules-confirmation',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './delete-rules-confirmation.component.html',
  styleUrl: './delete-rules-confirmation.component.css'
})
export class DeleteRulesConfirmationComponent {
  @Input() open = false;
  @Input() rule: Rule | null = null;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<void>();

  handleConfirm(): void {
    this.confirm.emit();
    this.openChange.emit(false);
  }

  handleCancel(): void {
    this.openChange.emit(false);
  }
}
