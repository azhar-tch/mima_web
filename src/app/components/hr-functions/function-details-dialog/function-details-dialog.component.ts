import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { HRFunction } from '../../../models/HRManagement';

@Component({
  selector: 'app-function-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hr-functions-details-dialog/hr-functions-details-dialog.component.html',
  styleUrl: './hr-functions-details-dialog/hr-functions-details-dialog.component.css'
})
export class FunctionDetailsDialogComponent {
  readonly X = X;

  @Input() hr: HRFunction | null = null;
  @Output() close = new EventEmitter<void>();

  get grade(): HRFunction | null {
    return this.hr;
  }

  handleClose() {
    this.close.emit();
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}
