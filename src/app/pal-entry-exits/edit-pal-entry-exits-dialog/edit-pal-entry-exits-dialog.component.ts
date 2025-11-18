import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { PALEntryExit, PALEntryExitRequest } from '../../models/Maritime';

@Component({
  selector: 'app-edit-pal-entry-exits-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-pal-entry-exits-dialog.component.html',
  styleUrl: './edit-pal-entry-exits-dialog.component.css'
})
export class EditPalEntryExitsDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: PALEntryExit;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<PALEntryExitRequest>();

  formData: PALEntryExitRequest = {} as PALEntryExitRequest;
  errors: Record<string, string> = {};

  ngOnInit() {
    // Copier les données de l'item dans formData
    this.formData = { ...this.item } as any;
  }

  handleClose() {
    this.close.emit();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    // Ajoutez vos validations ici
    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.save.emit(this.formData);
    }
  }
}
