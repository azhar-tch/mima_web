import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Users } from 'lucide-angular';
import { UnitStatus } from '../../../models/enums';
import { UnitsResponse } from '../../../models/Units';
import { AgentsService } from '../../../services/agents/agents.service';
import { AgentsResponse } from '../../../models/Agents';

@Component({
  selector: 'app-unit-details-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './unit-details-dialog.component.html',
  styleUrl: './unit-details-dialog.component.css'
})
export class UnitDetailsDialogComponent implements OnChanges {
  readonly X = X;
  readonly Users = Users;
  readonly UnitStatus = UnitStatus;

  @Input() open = false;
  @Input() unit: UnitsResponse | null = null;
  @Output() openChange = new EventEmitter<boolean>();

  agents: AgentsResponse[] = [];
  filteredAgents: AgentsResponse[] = [];
  agentSearchTerm: string = '';
  loadingAgents = false;

  constructor(private agentsService: AgentsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.open && this.unit) {
      this.loadAgents();
    }
  }

  loadAgents(): void {
    if (!this.unit?.trackingId) return;

    this.loadingAgents = true;
    this.agentSearchTerm = '';
    this.agentsService.listAgentsByUnit(this.unit.trackingId).subscribe({
      next: (res) => {
        this.agents = res.data || [];
        this.filteredAgents = this.agents;
        this.loadingAgents = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des agents', err);
        this.loadingAgents = false;
      }
    });
  }

  onAgentSearch(): void {
    if (!this.agentSearchTerm.trim()) {
      this.filteredAgents = this.agents;
      return;
    }

    const searchLower = this.agentSearchTerm.toLowerCase();
    this.filteredAgents = this.agents.filter(agent => {
      const fullName = `${agent.firstName} ${agent.lastName}`.toLowerCase();
      const registrationNo = agent.registrationNo?.toLowerCase() || '';
      const rank = agent.rank?.toLowerCase() || '';

      return fullName.includes(searchLower) ||
             registrationNo.includes(searchLower) ||
             rank.includes(searchLower);
    });
  }

  clearAgentSearch(): void {
    this.agentSearchTerm = '';
    this.filteredAgents = this.agents;
  }

  handleOpenChange(newOpen: boolean) {
    this.openChange.emit(newOpen);
  }

  getStatusLabel(status: UnitStatus): string {
    return status === UnitStatus.ACTIVE ? 'Actif' : 'Inactif';
  }

  getStatusClass(status: UnitStatus): string {
    return status === UnitStatus.ACTIVE
      ? 'bg-green-600 text-white'
      : 'bg-gray-400 text-white';
  }

  getChiefInitials(chiefName: string): string {
    if (!chiefName) return '?';
    const names = chiefName.split(' ');
    if (names.length >= 2) {
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
    return chiefName.charAt(0).toUpperCase();
  }
}
