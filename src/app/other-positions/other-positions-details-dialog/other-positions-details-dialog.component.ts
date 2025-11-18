import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { OtherPosition } from '../../models/HRManagement';

@Component({
  selector: 'app-other-positions-details-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './other-positions-details-dialog.component.html',
  styleUrl: './other-positions-details-dialog.component.css'
})
export class OtherPositionDetailsDialogComponent {
  readonly X = X;

  @Input() other-positions: OtherPosition | null = null;
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
