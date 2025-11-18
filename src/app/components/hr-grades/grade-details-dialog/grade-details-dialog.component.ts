import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { HRGrade } from '../../../models/HRManagement';

@Component({
  selector: 'app-grade-details-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './grade-details-dialog.component.html',
  styleUrl: './grade-details-dialog.component.css'
})
export class GradeDetailsDialogComponent {
  readonly X = X;

  @Input() grade: HRGrade | null = null;
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
