import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { STSOperation, STSOperationRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-edit-sts-operations-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-sts-operations-dialog.component.html',
  styleUrl: './edit-sts-operations-dialog.component.css'
})
export class EditStsOperationsDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: STSOperation;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<STSOperationRequest>();

  formData: STSOperationRequest = {} as STSOperationRequest;
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
