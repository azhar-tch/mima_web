import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { UnitType, UnitStatus } from '../../../models/enums';
import { Units } from '../../../models/Units';
import { AgentsService } from '../../../services/agents/agents.service';
import { AgentsResponse } from '../../../models/Agents';

@Component({
  selector: 'app-edit-unit-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-unit-dialog.component.html',
  styleUrls: ['./edit-unit-dialog.component.css']
})
export class EditUnitDialogComponent implements OnChanges, OnInit {
  readonly X = X;
  readonly unitTypes = Object.values(UnitType);
  readonly unitStatuses = Object.values(UnitStatus);

  agents: AgentsResponse[] = [];

  @Input() open = false;
  @Input() unit: Units | null = null;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Units>();

  formData: Units | null = null;
  errors: Record<string, string> = {};

  constructor(private agentsService: AgentsService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.agentsService.listAgents().subscribe({
      next: (res) => {
        this.agents = res.data;
      },
      error: (err) => console.error('Erreur lors du chargement des agents', err)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['unit'] || changes['open']) && this.unit) {
      this.formData = { ...this.unit };
      this.errors = {};
    }
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData?.name?.trim()) newErrors['name'] = 'Le nom est requis';
    if (!this.formData?.description?.trim()) newErrors['description'] = 'La description est requise';
    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (this.formData && this.validateForm()) {
      this.save.emit(this.formData);
    }
  }

  handleOpenChange(newOpen: boolean) {
    this.openChange.emit(newOpen);
  }
}
