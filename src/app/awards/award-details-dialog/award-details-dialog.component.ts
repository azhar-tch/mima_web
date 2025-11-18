import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { Award } from '../../models/HRManagement';

@Component({
  selector: 'app-award-details-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './award-details-dialog.component.html',
  styleUrl: './award-details-dialog.component.css'
})
export class AwardDetailsDialogComponent {
  readonly X = X;

  @Input() awards: Award | null = null;
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
