import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ShipProvisioning, ShipProvisioningRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-edit-ship-provisionings-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-ship-provisionings-dialog.component.html',
  styleUrl: './edit-ship-provisionings-dialog.component.css'
})
export class EditShipProvisioningsDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: ShipProvisioning;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ShipProvisioningRequest>();

  formData: ShipProvisioningRequest = {} as ShipProvisioningRequest;
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
