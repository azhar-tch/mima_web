import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { BMLCompany } from '../../../models/HRManagement';

@Component({
  selector: 'app-bml-companies-details-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './bml-companies-details-dialog.component.html',
  styleUrl: './bml-companies-details-dialog.component.css'
})
export class BmlCompanyDetailsDialogComponent {
  readonly X = X;

  @Input() bmlCompany: BMLCompany | null = null;
  @Output() close = new EventEmitter<void>();

  get grade(): BMLCompany | null {
    return this.bmlCompany;
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
