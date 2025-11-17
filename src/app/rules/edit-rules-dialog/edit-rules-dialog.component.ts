import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';

export interface Rule {
  id: string;
  title: string;
  value: number;
  unit: string;
  description: string;
}

const UNIT_OPTIONS = ['heures', 'jours', '%', '€', 'minutes', 'km'];

@Component({
  selector: 'app-edit-rules-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-rules-dialog.component.html',
  styleUrl: './edit-rules-dialog.component.css'
})
export class EditRulesDialogComponent implements OnChanges {
  readonly X = X;
  readonly UNIT_OPTIONS = UNIT_OPTIONS;

  @Input() open = false;
  @Input() rule: Rule | null = null;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Rule>();

  formData: Rule | null = null;
  errors: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rule'] || changes['open']) {
      if (this.rule && this.open) {
        this.formData = { ...this.rule };
      }
    }
  }

  validateForm(): boolean {
    if (!this.formData) return false;
    const newErrors: Record<string, string> = {};
    if (!this.formData.title.trim()) newErrors['title'] = 'Le titre est requis';
    if (this.formData.value < 0) newErrors['value'] = 'La valeur doit être valide';
    if (!this.formData.unit) newErrors['unit'] = 'L\'unité est requise';
    if (!this.formData.description.trim()) newErrors['description'] = 'La description est requise';

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit(): void {
    if (this.formData && this.validateForm()) {
      this.save.emit(this.formData);
      this.formData = null;
    }
  }

  handleOpenChange(newOpen: boolean): void {
    this.openChange.emit(newOpen);
    if (!newOpen) {
      this.formData = null;
      this.errors = {};
    }
  }
}
