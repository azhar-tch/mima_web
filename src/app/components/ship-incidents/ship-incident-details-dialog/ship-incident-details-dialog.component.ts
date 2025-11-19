import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShipIncident } from '../../../models/Maritime';

@Component({
  selector: 'app-ship-incident-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ship-incident-details-dialog.component.html',
  styleUrl: './ship-incident-details-dialog.component.css'
})
export class ShipIncidentDetailsDialogComponent {
  readonly X = X;

  @Input() incident: ShipIncident | null = null;
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
