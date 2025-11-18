import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Edit, Trash2, Eye, X } from 'lucide-angular';
import { AgentsResponse, AgentsRequest } from '../../models/Agents';
import { ApiResponse } from '../../models/api-response';
import { MarinerStatus, MaritimeRank, MaritimeSpecialty } from '../../models/enums';
import { AgentsService } from '../../services/agents/agents.service';
import { UnitsService } from '../../services/units/units.service';
import { UnitsResponse } from '../../models/Units';


@Component({
  selector: 'app-agents',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Eye = Eye;
  readonly X = X;

  agents: AgentsResponse[] = [];
  units: { name: string; trackingId: string }[] = []; // liste de tes unités

  maritimeRanks = [
    { value: MaritimeRank.CAPITAINE, label: 'Capitaine' },
    { value: MaritimeRank.COMMANDANT, label: 'Commandant' },
    { value: MaritimeRank.LIEUTENANT, label: 'Lieutenant' },
    { value: MaritimeRank.ENSEIGNE, label: 'Enseigne' },
    { value: MaritimeRank.MAITRE_PRINCIPAL, label: 'Maître Principal' },
    { value: MaritimeRank.PREMIER_MAITRE, label: 'Premier Maître' },
    { value: MaritimeRank.MAITRE, label: 'Maître' },
    { value: MaritimeRank.SECOND_MAITRE, label: 'Second Maître' },
    { value: MaritimeRank.QUARTIER_MAITRE_1ERE_CLASSE, label: 'Quartier Maître 1ère Classe' },
    { value: MaritimeRank.QUARTIER_MAITRE_2EME_CLASSE, label: 'Quartier Maître 2ème Classe' },
    { value: MaritimeRank.MATELOT_BREVETE, label: 'Matelot Breveté' },
    { value: MaritimeRank.MATELOT, label: 'Matelot' }
  ];

  specialties = [
    { value: MaritimeSpecialty.NAVIGATION, label: 'Navigation' },
    { value: MaritimeSpecialty.MECANIQUE, label: 'Mécanique' },
    { value: MaritimeSpecialty.COMMUNICATION, label: 'Communication' },
    { value: MaritimeSpecialty.ARMEMENT, label: 'Armement' },
    { value: MaritimeSpecialty.ELECTRONIQUE, label: 'Électronique' },
    { value: MaritimeSpecialty.SECURITE, label: 'Sécurité' },
    { value: MaritimeSpecialty.PLONGEE, label: 'Plongée' },
    { value: MaritimeSpecialty.AVIATION, label: 'Aviation' },
    { value: MaritimeSpecialty.SANTE, label: 'Santé' },
    { value: MaritimeSpecialty.CUISINE, label: 'Cuisine' },
    { value: MaritimeSpecialty.ADMINISTRATION, label: 'Administration' },
    { value: MaritimeSpecialty.LOGISTIQUE, label: 'Logistique' },
    { value: MaritimeSpecialty.ENERGIE, label: 'Énergie' },
    { value: MaritimeSpecialty.DETECTION, label: 'Détection' }
  ];

  sexOptions = [
    { value: 'M', label: 'Masculin' },
    { value: 'F', label: 'Féminin' }
  ];

  statuses = [
    { value: MarinerStatus.DISPONIBLE, label: 'Disponible' },
    { value: MarinerStatus.EN_MER, label: 'En mer' },
    { value: MarinerStatus.EN_GARDE, label: 'En garde' },
    { value: MarinerStatus.PERMISSION, label: 'Permission' },
    { value: MarinerStatus.ABSENT, label: 'Absent' }
];


  searchTerm = '';
  filterUnit = '';
  filterStatus = '';
  filterMaritimeRank = '';

  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  showDetailsModal = false;
  selectedAgent: AgentsResponse | null = null;

   agentForm: AgentsRequest = {
    registrationNo: '',
    firstName: '',
    lastName: '',
    maritimeRank: undefined,
    specialty: undefined,
    sex: '',
    unitTrackingId: '',
    availability: true,
    status: MarinerStatus.DISPONIBLE
  };

  constructor(private agentsService: AgentsService, private unitsService: UnitsService) {}

  ngOnInit(): void {
    this.loadAgents();
    this.loadUnits();
  }

  loadAgents() {
    this.agentsService.listAgents().subscribe((res: ApiResponse<AgentsResponse[]>) => {
      this.agents = res.data || [];
    });
  }

  loadUnits() {
  this.unitsService.listUnits().subscribe({
    next: (res) => {
      this.units = (res.data || []).map(unit => ({
        trackingId: unit.trackingId,
        name: unit.name
      }));
    },
    error: (err) => {
      console.error('Erreur lors du chargement des unités', err);
    }
  });
}

  get filteredAgents() {
    return this.agents.filter(agent => {
      const matchesSearch =
        agent.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        agent.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        agent.registrationNo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesUnit = !this.filterUnit || agent.unitTrackingId === this.filterUnit;
      const matchesStatus = !this.filterStatus || agent.status === this.filterStatus;
      const matchesMaritimeRank = !this.filterMaritimeRank || agent.maritimeRank === this.filterMaritimeRank;
      return matchesSearch && matchesUnit && matchesStatus && matchesMaritimeRank;
    });
  }

  openAddModal() {
    this.agentForm = {
      registrationNo: '',
      firstName: '',
      lastName: '',
      maritimeRank: undefined,
      specialty: undefined,
      sex: '',
      unitTrackingId: '', // obligatoire
      availability: true,
      status: MarinerStatus.DISPONIBLE,
      nationality: '',
      city: '',
      emergencyContact: '',
      maritalStatus: '',
      recruitmentDate: '',
      contractEndDate: '',
      idCardNumber: '',
      passportNumber: '',
      idExpiryDate: '',
      insuranceNumber: '',
      bankAccount: ''
    };
    this.showAddModal = true;
  }

  openEditModal(agent: AgentsResponse) {
    this.selectedAgent = agent;

    // 🔹 Si le backend ne renvoie pas unitTrackingId, on le trouve par le nom de l'unité
    let unitTrackingId = agent.unitTrackingId || '';
    if (!unitTrackingId && agent.unitName) {
      const foundUnit = this.units.find(u => u.name === agent.unitName);
      if (foundUnit) {
        unitTrackingId = foundUnit.trackingId;
      }
    }

    this.agentForm = {
      registrationNo: agent.registrationNo,
      firstName: agent.firstName || '',
      lastName: agent.lastName || '',
      maritimeRank: agent.maritimeRank,
      specialty: agent.specialty,
      sex: agent.sex || '',
      unitTrackingId: unitTrackingId,
      availability: agent.availability,
      status: agent.status,
      nationality: agent.nationality || '',
      city: agent.city || '',
      emergencyContact: agent.emergencyContact || '',
      maritalStatus: agent.maritalStatus || '',
      recruitmentDate: agent.recruitmentDate || '',
      contractEndDate: agent.contractEndDate || '',
      idCardNumber: agent.idCardNumber || '',
      passportNumber: agent.passportNumber || '',
      idExpiryDate: agent.idExpiryDate || '',
      insuranceNumber: agent.insuranceNumber || '',
      bankAccount: agent.bankAccount || ''
    };
    this.showEditModal = true;
  }

  addAgent() {
    // Validation des champs requis
    if (!this.agentForm.registrationNo?.trim()) {
      console.error('❌ Le numéro d\'enregistrement est requis');
      alert('Le numéro d\'enregistrement est requis');
      return;
    }

    if (!this.agentForm.firstName?.trim()) {
      console.error('❌ Le prénom est requis');
      alert('Le prénom est requis');
      return;
    }

    if (!this.agentForm.lastName?.trim()) {
      console.error('❌ Le nom est requis');
      alert('Le nom est requis');
      return;
    }

    if (!this.agentForm.maritimeRank) {
      console.error('❌ Le grade maritime est requis');
      alert('Le grade maritime est requis');
      return;
    }

    if (!this.agentForm.specialty) {
      console.error('❌ La spécialité est requise');
      alert('La spécialité est requise');
      return;
    }

    if (!this.agentForm.sex?.trim()) {
      console.error('❌ Le sexe est requis');
      alert('Le sexe est requis');
      return;
    }

    if (!this.agentForm.unitTrackingId || this.agentForm.unitTrackingId === '') {
      console.error('❌ L\'unité est requise');
      alert('Veuillez sélectionner une unité');
      return;
    }

    // Préparer les données
    const agentData: AgentsRequest = {
      registrationNo: this.agentForm.registrationNo,
      firstName: this.agentForm.firstName,
      lastName: this.agentForm.lastName,
      maritimeRank: this.agentForm.maritimeRank,
      specialty: this.agentForm.specialty,
      sex: this.agentForm.sex,
      unitTrackingId: this.agentForm.unitTrackingId,
      availability: this.agentForm.availability,
      status: this.agentForm.status,
      nationality: this.agentForm.nationality || undefined,
      city: this.agentForm.city || undefined,
      emergencyContact: this.agentForm.emergencyContact || undefined,
      maritalStatus: this.agentForm.maritalStatus || undefined,
      recruitmentDate: this.agentForm.recruitmentDate || undefined,
      contractEndDate: this.agentForm.contractEndDate || undefined,
      idCardNumber: this.agentForm.idCardNumber || undefined,
      passportNumber: this.agentForm.passportNumber || undefined,
      idExpiryDate: this.agentForm.idExpiryDate || undefined,
      insuranceNumber: this.agentForm.insuranceNumber || undefined,
      bankAccount: this.agentForm.bankAccount || undefined
    };

    console.log('📤 Données envoyées:', agentData);
    this.agentsService.createAgent(agentData).subscribe({
      next: (res: ApiResponse<AgentsResponse>) => {
        console.log('✅ Agent créé:', res);
        if (res.data) this.agents.push(res.data);
        this.closeModals();
      },
      error: (err: any) => {
        console.error('❌ Erreur création agent:', err);
        console.error('Message d\'erreur:', err.error?.message || err.message);
        console.error('Détails:', err.error?.details || err.error);
        alert(`Erreur: ${err.error?.message || 'Impossible de créer l\'agent'}`);
      }
    });
  }

  updateAgent() {
    if (!this.selectedAgent) return;

    // Validation des champs requis
    if (!this.agentForm.registrationNo?.trim()) {
      alert('Le numéro d\'enregistrement est requis');
      return;
    }
    if (!this.agentForm.firstName?.trim()) {
      alert('Le prénom est requis');
      return;
    }
    if (!this.agentForm.lastName?.trim()) {
      alert('Le nom est requis');
      return;
    }
    if (!this.agentForm.maritimeRank) {
      alert('Le grade maritime est requis');
      return;
    }
    if (!this.agentForm.specialty) {
      alert('La spécialité est requise');
      return;
    }
    if (!this.agentForm.sex?.trim()) {
      alert('Le sexe est requis');
      return;
    }
    if (!this.agentForm.unitTrackingId || this.agentForm.unitTrackingId === '') {
      alert('Veuillez sélectionner une unité');
      return;
    }

    console.log('📤 Données de mise à jour envoyées:', this.agentForm);
    this.agentsService.updateAgent(this.selectedAgent.trackingId, this.agentForm).subscribe({
      next: (res: ApiResponse<AgentsResponse>) => {
        console.log('✅ Agent mis à jour:', res);
        if (res.data) {
          const index = this.agents.findIndex(a => a.trackingId === res.data!.trackingId);
          if (index !== -1) this.agents[index] = res.data;
        }
        this.closeModals();
      },
      error: (err: any) => {
        console.error('❌ Erreur mise à jour agent:', err);
        console.error('Message d\'erreur:', err.error?.message || err.message);
        console.error('Détails:', err.error?.details || err.error);
        alert(`Erreur: ${err.error?.message || 'Impossible de mettre à jour l\'agent'}`);
      }
    });
  }

  deleteAgent() {
    if (!this.selectedAgent) return;
    this.agentsService.deleteAgent(this.selectedAgent.trackingId).subscribe(() => {
      this.agents = this.agents.filter(a => a.trackingId !== this.selectedAgent!.trackingId);
      this.closeModals();
    });
  }

  openDeleteModal(agent: AgentsResponse) {
  this.selectedAgent = agent;
  this.showDeleteModal = true;
}

  openDetailsModal(agent: AgentsResponse) {
  this.selectedAgent = agent;
  this.showDetailsModal = true;
}

  closeModals() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.showDetailsModal = false;
    this.selectedAgent = null;
  }

  clearFilters() {
  this.searchTerm = '';
  this.filterUnit = '';
  this.filterStatus = '';
  this.filterMaritimeRank = '';
}

  getStatusLabel(status: MarinerStatus) {
  switch (status) {
    case MarinerStatus.DISPONIBLE: return 'Disponible';
    case MarinerStatus.EN_MER: return 'En mer';
    case MarinerStatus.EN_GARDE: return 'En garde';
    case MarinerStatus.PERMISSION: return 'Permission';
    case MarinerStatus.ABSENT: return 'Absent';
    case MarinerStatus.EN_FORMATION: return 'En formation';
    case MarinerStatus.INDISPONIBLE: return 'Indisponible';
    default: return '';
  }
}

getStatusColor(status: MarinerStatus) {
  switch (status) {
    case MarinerStatus.DISPONIBLE: return 'bg-blue-100 text-blue-600';
    case MarinerStatus.EN_MER: return 'bg-red-100 text-red-600';
    case MarinerStatus.EN_GARDE: return 'bg-green-100 text-green-600';
    case MarinerStatus.PERMISSION: return 'bg-yellow-100 text-yellow-600';
    case MarinerStatus.ABSENT: return 'bg-gray-100 text-gray-600';
    case MarinerStatus.EN_FORMATION: return 'bg-purple-100 text-purple-600';
    case MarinerStatus.INDISPONIBLE: return 'bg-orange-100 text-orange-600';
    default: return '';
  }
}

getRankLabel(rank: MaritimeRank): string {
  const found = this.maritimeRanks.find(r => r.value === rank);
  return found ? found.label : rank || '';
}

getSpecialtyLabel(specialty: MaritimeSpecialty): string {
  const found = this.specialties.find(s => s.value === specialty);
  return found ? found.label : specialty || '';
}

}
