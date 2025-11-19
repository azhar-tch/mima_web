import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { CommercialShip } from '../../../models/Maritime';

@Component({
  selector: 'app-commercial-ship-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './commercial-ship-details-dialog.component.html',
  styleUrl: './commercial-ship-details-dialog.component.css'
})
export class CommercialShipDetailsDialogComponent {
  readonly X = X;

  @Input() ship: CommercialShip | null = null;
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
