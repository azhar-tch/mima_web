import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';

interface RuleFormData {
  title: string;
  value: string;
  unit: string;
  description: string;
}

const UNIT_OPTIONS = ['heures', 'jours', '%', '€', 'minutes', 'km'];

interface RuleData {
  title: string;
  value: number;
  unit: string;
  description: string;
}

@Component({
  selector: 'app-add-rules-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-rules-dialog.component.html',
  styleUrl: './add-rules-dialog.component.css'
})
export class AddRulesDialogComponent {
  readonly X = X;
  readonly UNIT_OPTIONS = UNIT_OPTIONS;

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<RuleData>();

  formData: RuleFormData = {
    title: '',
    value: '',
    unit: 'heures',
    description: '',
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      title: '',
      value: '',
      unit: 'heures',
      description: '',
    };
    this.errors = {};
  }

  handleOpenChange(newOpen: boolean) {
    this.openChange.emit(newOpen);
    if (!newOpen) {
      this.handleReset();
    }
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.title.trim()) newErrors['title'] = 'Le titre est requis';
    if (!this.formData.value || Number.parseFloat(this.formData.value) < 0) {
      newErrors['value'] = 'La valeur doit être valide';
    }
    if (!this.formData.unit) newErrors['unit'] = 'L\'unité est requise';
    if (!this.formData.description.trim()) newErrors['description'] = 'La description est requise';

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.add.emit({
        title: this.formData.title,
        value: Number.parseFloat(this.formData.value),
        unit: this.formData.unit,
        description: this.formData.description,
      });
      this.handleReset();
    }
  }
}
