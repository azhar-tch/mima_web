import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, CircleAlert } from 'lucide-angular';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css'
})
export class ErrorDialogComponent {
  readonly X = X;
  readonly CircleAlert = CircleAlert;

  @Input() open = false;
  @Input() title = 'Erreur';
  @Input() message = '';
  @Output() openChange = new EventEmitter<boolean>();

  handleClose() {
    this.openChange.emit(false);
  }
}
