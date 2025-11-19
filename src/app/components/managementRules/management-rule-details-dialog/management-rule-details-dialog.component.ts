import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { ManagementRules } from '../../../models/ManagementRules';

@Component({
  selector: 'app-management-rule-details-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './management-rule-details-dialog.component.html',
  styleUrl: './management-rule-details-dialog.component.css'
})
export class ManagementRuleDetailsDialogComponent {
  readonly X = X;

  @Input() rule: ManagementRules | null = null;
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
