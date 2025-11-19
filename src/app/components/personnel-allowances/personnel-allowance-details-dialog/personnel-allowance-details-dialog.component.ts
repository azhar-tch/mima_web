import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { PersonnelAllowance } from '../../../models/Maritime';

@Component({
  selector: 'app-personnel-allowance-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './personnel-allowance-details-dialog.component.html',
  styleUrl: './personnel-allowance-details-dialog.component.css'
})
export class PersonnelAllowanceDetailsDialogComponent {
  readonly X = X;

  @Input() allowance: PersonnelAllowance | null = null;
  @Output() close = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  formatCurrency(amount: number | undefined, currency?: string): string {
    if (!amount) return '-';
    const curr = currency || 'USD';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: curr }).format(amount);
  }
}
