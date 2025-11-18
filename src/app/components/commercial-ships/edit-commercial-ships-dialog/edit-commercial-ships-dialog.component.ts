import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { CommercialShip, CommercialShipRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-edit-commercial-ships-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-commercial-ships-dialog.component.html',
  styleUrl: './edit-commercial-ships-dialog.component.css'
})
export class EditCommercialShipsDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: CommercialShip;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<CommercialShipRequest>();

  formData: CommercialShipRequest = {} as CommercialShipRequest;
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
