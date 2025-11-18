import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { UnitStatus, UnitType } from '../../../models/enums';
import { UnitsService } from '../../../services/units/units.service';
import { AgentsService } from '../../../services/agents/agents.service';
import { UnitsRequest, UnitsResponse } from '../../../models/Units';
import { AgentsResponse } from '../../../models/Agents';

@Component({
  selector: 'app-add-unit-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-unit-dialog.component.html',
  styleUrl: './add-unit-dialog.component.css'
})
export class AddUnitDialogComponent implements OnInit {
  readonly X = X;
  readonly unitTypes = Object.values(UnitType);
  readonly unitStatuses = ['ACTIVE', 'INACTIVE'] as UnitStatus[];

  agents: AgentsResponse[] = [];

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<UnitsResponse>(); // ✅ Émet UnitsResponse (l'unité créée)

  formData: UnitsRequest = {
    name: '',
    description: '',
    type: UnitType.SHIP,
    chiefTrackingId: undefined
  };

  errors: Record<string, string> = {};

  constructor(
    private unitsService: UnitsService,
    private agentsService: AgentsService
  ) {}

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

  handleReset() {
    this.formData = {
      name: '',
      description: '',
      type: UnitType.SHIP,
      chiefTrackingId: undefined
    };
    this.errors = {};
  }

  handleOpenChange(newOpen: boolean) {
    this.openChange.emit(newOpen);
    if (!newOpen) this.handleReset();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    if (!this.formData.name.trim()) newErrors['name'] = 'Le nom est requis';
    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit() {
    if (!this.validateForm()) return;

    // Convertir les chaînes vides en undefined pour chiefTrackingId
    const requestData: UnitsRequest = {
      ...this.formData,
      chiefTrackingId: this.formData.chiefTrackingId && this.formData.chiefTrackingId.trim() !== ''
        ? this.formData.chiefTrackingId
        : undefined
    };

    console.log('📤 Données envoyées pour création d\'unité:');
    console.log('  - formData brut:', this.formData);
    console.log('  - requestData préparé:', requestData);
    console.log('  - JSON stringifié:', JSON.stringify(requestData, null, 2));

    this.unitsService.createUnit(requestData).subscribe({
      next: (res) => {
        console.log('✅ Unité créée avec succès:', res);
        this.add.emit(res.data); // ✅ On renvoie l'objet créé au parent
        this.handleReset();
        this.handleOpenChange(false);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la création de l\'unité:', err);
        console.error('❌ Status:', err.status);
        console.error('❌ Error object complet:', err.error);
        console.error('❌ Message:', err.error?.message || err.message);
        console.error('❌ Error stringifié:', JSON.stringify(err.error, null, 2));
      }
    });
  }
}
