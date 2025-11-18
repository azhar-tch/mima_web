import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { ServicePosition } from '../../../models/HRManagement';

@Component({
  selector: 'app-service-positions-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './service-positions-details-dialog.component.html',
  styleUrl: './service-positions-details-dialog.component.css'
})
export class ServicePositionDetailsDialogComponent {
  readonly X = X;

  @Input() service-positions: ServicePosition | null = null;
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
