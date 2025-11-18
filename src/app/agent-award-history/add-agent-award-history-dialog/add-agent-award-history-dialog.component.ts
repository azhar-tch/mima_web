import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { AgentAwardHistoryRequest } from '../../models/HRManagement';

@Component({
  selector: 'app-add-agent-award-history-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-agent-award-history-dialog.component.html',
  styleUrl: './add-agent-award-history-dialog.component.css'
})
export class AddAgentAwardHistoryDialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<AgentAwardHistoryRequest>();

  formData: AgentAwardHistoryRequest = {
    agentTrackingId: '',
    awardTrackingId: '',
    awardDate: ''
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
    agentTrackingId: '',
    awardTrackingId: '',
    awardDate: ''
    };
    this.errors = {};
  }

  handleClose() {
    this.close.emit();
    this.handleReset();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (\!this.formData.agentTrackingId || (typeof this.formData.agentTrackingId === 'string' && \!this.formData.agentTrackingId.trim())) {
      newErrors['agentTrackingId'] = 'ID de l'agent est requis';
    }
    if (\!this.formData.awardTrackingId || (typeof this.formData.awardTrackingId === 'string' && \!this.formData.awardTrackingId.trim())) {
      newErrors['awardTrackingId'] = 'ID de la distinction est requis';
    }
    if (\!this.formData.awardDate || (typeof this.formData.awardDate === 'string' && \!this.formData.awardDate.trim())) {
      newErrors['awardDate'] = 'Date de la distinction est requis';
    }

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.add.emit(this.formData);
      this.handleReset();
    }
  }
}
