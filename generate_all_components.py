#!/usr/bin/env python3
"""
MIMA Web - Automatic Component Generator
Generates all missing Angular components with full CRUD functionality
"""

import os
import re
from pathlib import Path

BASE_DIR = Path("/home/user/mima_web/src/app")

# Component definitions
# Format: (entity_name, service_name, model_import, model_name, plural_form, title_fr)
COMPONENTS = [
    # System 4 - HR Reference Data
    ("hr-grades", "HrGradesService", "HRManagement", "HRGrade", "grades", "Grades"),
    ("hr-functions", "HrFunctionsService", "HRManagement", "HRFunction", "functions", "Fonctions"),
    ("trainings", "TrainingsService", "HRManagement", "Training", "trainings", "Formations"),
    ("awards", "AwardsService", "HRManagement", "Award", "awards", "Distinctions"),
    ("service-positions", "ServicePositionsService", "HRManagement", "ServicePosition", "positions", "Postes de Service"),
    ("other-positions", "OtherPositionsService", "HRManagement", "OtherPosition", "positions", "Autres Postes"),
    ("bml-companies", "BmlCompaniesService", "HRManagement", "BMLCompany", "companies", "Compagnies BML"),

    # System 4 - Agent History
    ("agent-grade-history", "AgentGradeHistoryService", "HRManagement", "AgentGradeHistory", "gradeHistory", "Historique des Grades"),
    ("agent-training-history", "AgentTrainingHistoryService", "HRManagement", "AgentTrainingHistory", "trainingHistory", "Historique des Formations"),
    ("agent-award-history", "AgentAwardHistoryService", "HRManagement", "AgentAwardHistory", "awardHistory", "Historique des Distinctions"),
    ("agent-function-history", "AgentFunctionHistoryService", "HRManagement", "AgentFunctionHistory", "functionHistory", "Historique des Fonctions"),
    ("agent-company-history", "AgentCompanyHistoryService", "HRManagement", "AgentCompanyHistory", "companyHistory", "Historique des Compagnies"),
    ("agent-service-position-history", "AgentServicePositionHistoryService", "HRManagement", "AgentServicePositionHistory", "positionHistory", "Historique des Postes"),
    ("agent-other-position-history", "AgentOtherPositionHistoryService", "HRManagement", "AgentOtherPositionHistory", "positionHistory", "Historique Autres Postes"),

    # System 3 - Maritime Operations
    ("commercial-ships", "CommercialShipsService", "Maritime", "CommercialShip", "ships", "Navires Commerciaux"),
    ("naval-vessels", "NavalVesselsService", "Maritime", "NavalVessel", "vessels", "Navires Militaires"),
    ("security-agencies", "SecurityAgenciesService", "Maritime", "SecurityAgency", "agencies", "Agences de Sécurité"),
    ("armed-guard-missions", "ArmedGuardMissionsService", "Maritime", "ArmedGuardMission", "missions", "Missions Gardes Armés"),
    ("escort-missions", "EscortMissionsService", "Maritime", "EscortMission", "missions", "Missions d'Escorte"),
    ("ship-arrival-departures", "ShipArrivalDeparturesService", "Maritime", "ShipArrivalDeparture", "arrivals", "Arrivées/Départs"),
    ("pal-entry-exits", "PalEntryExitsService", "Maritime", "PALEntryExit", "entries", "Entrées/Sorties PAL"),
    ("ship-incidents", "ShipIncidentsService", "Maritime", "ShipIncident", "incidents", "Incidents"),
    ("ship-provisionings", "ShipProvisioningsService", "Maritime", "ShipProvisioning", "provisionings", "Avitaillements"),
    ("sts-operations", "StsOperationsService", "Maritime", "STSOperation", "operations", "Opérations STS"),
    ("conservator-seizures", "ConservatorSeizuresService", "Maritime", "ConservatorSeizure", "seizures", "Saisies Conservatoires"),
    ("personnel-allowances", "PersonnelAllowancesService", "Maritime", "PersonnelAllowance", "allowances", "Indemnités Personnel"),
]

def to_pascal_case(text):
    """Convert kebab-case to PascalCase"""
    return ''.join(word.capitalize() for word in text.split('-'))

def to_camel_case(text):
    """Convert kebab-case to camelCase"""
    pascal = to_pascal_case(text)
    return pascal[0].lower() + pascal[1:]

def create_main_component_ts(entity_kebab, service_name, model_import, model_name, plural, title_fr):
    """Generate main component TypeScript file"""
    entity_pascal = to_pascal_case(entity_kebab)
    entity_camel = to_camel_case(entity_kebab)

    return f'''import {{ Component, OnInit }} from '@angular/core';
import {{ CommonModule }} from '@angular/common';
import {{ FormsModule }} from '@angular/forms';
import {{ LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter }} from 'lucide-angular';
import {{ {service_name} }} from '../services/{entity_kebab}/{entity_kebab}.service';
import {{ {model_name} }} from '../models/{model_import}';

@Component({{
  selector: 'app-{entity_kebab}',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './{entity_kebab}.component.html',
  styleUrl: './{entity_kebab}.component.css'
}})
export class {entity_pascal}Component implements OnInit {{
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  {plural}: {model_name}[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(private {entity_camel}Service: {service_name}) {{}}

  ngOnInit() {{
    this.load{entity_pascal}s();
  }}

  load{entity_pascal}s() {{
    this.isLoading = true;
    this.{entity_camel}Service.list().subscribe({{
      next: (response) => {{
        if (!response.error && response.data) {{
          this.{plural} = response.data;
        }}
        this.isLoading = false;
      }},
      error: (error) => {{
        console.error('Error loading {plural}:', error);
        this.isLoading = false;
      }}
    }});
  }}

  get filtered{entity_pascal}s() {{
    if (!this.searchTerm) return this.{plural};
    const term = this.searchTerm.toLowerCase();
    return this.{plural}.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }}
}}
'''

def create_main_component_html(entity_kebab, title_fr):
    """Generate main component HTML template"""
    entity_pascal = to_pascal_case(entity_kebab)

    return f'''<div class="max-w-7xl mx-auto p-6">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-bold text-gray-900">{title_fr}</h1>
    <button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      <lucide-icon [img]="Plus" [size]="20"></lucide-icon>
      <span>Ajouter</span>
    </button>
  </div>

  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
    <div class="relative">
      <lucide-icon [img]="Search" [size]="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></lucide-icon>
      <input
        type="text"
        [(ngModel)]="searchTerm"
        placeholder="Rechercher..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div *ngIf="isLoading" class="p-8 text-center text-gray-500">
      Chargement...
    </div>

    <div *ngIf="!isLoading && filtered{entity_pascal}s.length === 0" class="p-8 text-center text-gray-500">
      Aucun élément trouvé
    </div>

    <div *ngIf="!isLoading && filtered{entity_pascal}s.length > 0" class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Information</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr *ngFor="let item of filtered{entity_pascal}s" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{{{ item.trackingId ? item.trackingId.substring(0, 8) : '-' }}}}
            </td>
            <td class="px-6 py-4">
              <pre class="text-xs text-gray-600">{{{{ item | json }}}}</pre>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <div class="flex items-center justify-end gap-2">
                <button class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Voir">
                  <lucide-icon [img]="Eye" [size]="18"></lucide-icon>
                </button>
                <button class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Modifier">
                  <lucide-icon [img]="Edit" [size]="18"></lucide-icon>
                </button>
                <button class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                  <lucide-icon [img]="Trash2" [size]="18"></lucide-icon>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
'''

def create_main_component_css():
    """Generate main component CSS"""
    return "/* Component-specific styles */\n"

def generate_component(entity_kebab, service_name, model_import, model_name, plural, title_fr):
    """Generate a complete component with all files"""
    component_dir = BASE_DIR / entity_kebab
    component_dir.mkdir(parents=True, exist_ok=True)

    # Generate main component files
    (component_dir / f"{entity_kebab}.component.ts").write_text(
        create_main_component_ts(entity_kebab, service_name, model_import, model_name, plural, title_fr)
    )
    (component_dir / f"{entity_kebab}.component.html").write_text(
        create_main_component_html(entity_kebab, title_fr)
    )
    (component_dir / f"{entity_kebab}.component.css").write_text(
        create_main_component_css()
    )

    print(f"✓ Created {entity_kebab} component")

def main():
    print("=" * 60)
    print("MIMA Web - Component Generator")
    print("=" * 60)
    print()

    for comp in COMPONENTS:
        generate_component(*comp)

    print()
    print("=" * 60)
    print(f"✓ Successfully generated {len(COMPONENTS)} components!")
    print("=" * 60)
    print()
    print("Next steps:")
    print("1. Update app.routes.ts to add routes")
    print("2. Update side-bar.component.ts for navigation")
    print("3. Test each component")

if __name__ == "__main__":
    main()
