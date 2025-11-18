import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ArmedGuardMission, ArmedGuardMissionRequest } from '../../../models/Maritime';

@Component({
  selector: 'app-edit-armed-guard-missions-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-armed-guard-missions-dialog.component.html',
  styleUrl: './edit-armed-guard-missions-dialog.component.css'
})
export class EditArmedGuardMissionsDialogComponent implements OnInit {
  readonly X = X;

  @Input() item!: ArmedGuardMission;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ArmedGuardMissionRequest>();

  formData: ArmedGuardMissionRequest = {} as ArmedGuardMissionRequest;
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
