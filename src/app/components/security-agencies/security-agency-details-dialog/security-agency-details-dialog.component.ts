import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { SecurityAgency } from '../../../models/Maritime';

@Component({
  selector: 'app-security-agency-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './security-agency-details-dialog.component.html',
  styleUrl: './security-agency-details-dialog.component.css'
})
export class SecurityAgencyDetailsDialogComponent {
  readonly X = X;

  @Input() agency: SecurityAgency | null = null;
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
