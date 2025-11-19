import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { STSOperation } from '../../../models/Maritime';

@Component({
  selector: 'app-sts-operation-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sts-operation-details-dialog.component.html',
  styleUrl: './sts-operation-details-dialog.component.css'
})
export class StsOperationDetailsDialogComponent {
  readonly X = X;

  @Input() operation: STSOperation | null = null;
  @Output() close = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}
