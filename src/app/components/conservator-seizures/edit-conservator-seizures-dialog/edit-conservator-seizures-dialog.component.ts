import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ConservatorSeizure, ConservatorSeizureRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-edit-conservator-seizures-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-conservator-seizures-dialog.component.html',
  styleUrl: './edit-conservator-seizures-dialog.component.css'
})
export class EditConservatorSeizuresDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: ConservatorSeizure;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ConservatorSeizureRequest>();

  formData: ConservatorSeizureRequest = {} as ConservatorSeizureRequest;
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
