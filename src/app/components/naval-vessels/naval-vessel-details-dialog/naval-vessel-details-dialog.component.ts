import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { NavalVessel } from '../../../models/Maritime';

@Component({
  selector: 'app-naval-vessel-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './naval-vessel-details-dialog.component.html',
  styleUrl: './naval-vessel-details-dialog.component.css'
})
export class NavalVesselDetailsDialogComponent {
  readonly X = X;

  @Input() vessel: NavalVessel | null = null;
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
