import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { CommercialShip } from '../../../models/Maritime';
import { ShipStatus } from '../../../models/enums';

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

  getStatusLabel(status: ShipStatus | undefined): string {
    if (!status) return 'N/A';
    switch (status) {
      case ShipStatus.IN_PORT: return 'Au port';
      case ShipStatus.AT_SEA: return 'En mer';
      case ShipStatus.UNDER_ESCORT: return 'En escorte';
      case ShipStatus.WAITING: return 'En attente';
      case ShipStatus.LOADING: return 'En chargement';
      case ShipStatus.UNLOADING: return 'En déchargement';
      case ShipStatus.IN_MAINTENANCE: return 'En maintenance';
      case ShipStatus.IN_REPAIR: return 'En réparation';
      case ShipStatus.OTHER: return 'Autre';
      default: return status;
    }
  }
}
