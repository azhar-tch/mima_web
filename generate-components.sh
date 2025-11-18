#!/bin/bash

# Script to generate all missing Angular components for MIMA Web
# This follows the established pattern from existing components

set -e

BASE_DIR="/home/user/mima_web/src/app"

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}   MIMA Web - Component Generation Script${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Function to create component structure
create_component() {
  local entity_name=$1
  local entity_name_lower=$(echo "$entity_name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
  local entity_name_pascal=$(echo "$entity_name" | sed 's/ //g')
  local entity_name_camel=$(echo "$entity_name_pascal" | sed 's/^./\L&/')
  local service_name=$2
  local model_import=$3
  local model_name=$4
  local entity_plural=$5

  local component_dir="$BASE_DIR/$entity_name_lower"

  echo -e "${GREEN}Creating component: $entity_name${NC}"

  # Create directories
  mkdir -p "$component_dir/add-${entity_name_lower}-dialog"
  mkdir -p "$component_dir/edit-${entity_name_lower}-dialog"
  mkdir -p "$component_dir/delete-${entity_name_lower}-confirmation"
  mkdir -p "$component_dir/${entity_name_lower}-details-dialog"

  # Generate main component TypeScript
  cat > "$component_dir/${entity_name_lower}.component.ts" << EOF
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-angular';
import { ${service_name} } from '../services/${entity_name_lower}/${entity_name_lower}.service';
import { ${model_name} } from '../models/${model_import}';
import { Add${entity_name_pascal}DialogComponent } from './add-${entity_name_lower}-dialog/add-${entity_name_lower}-dialog.component';
import { Edit${entity_name_pascal}DialogComponent } from './edit-${entity_name_lower}-dialog/edit-${entity_name_lower}-dialog.component';
import { Delete${entity_name_pascal}ConfirmationComponent } from './delete-${entity_name_lower}-confirmation/delete-${entity_name_lower}-confirmation.component';
import { ${entity_name_pascal}DetailsDialogComponent } from './${entity_name_lower}-details-dialog/${entity_name_lower}-details-dialog.component';

@Component({
  selector: 'app-${entity_name_lower}',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    Add${entity_name_pascal}DialogComponent,
    Edit${entity_name_pascal}DialogComponent,
    Delete${entity_name_pascal}ConfirmationComponent,
    ${entity_name_pascal}DetailsDialogComponent
  ],
  templateUrl: './${entity_name_lower}.component.html',
  styleUrl: './${entity_name_lower}.component.css'
})
export class ${entity_name_pascal}Component implements OnInit {
  readonly Plus = Plus;
  readonly Search = Search;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  ${entity_plural}: ${model_name}[] = [];
  searchTerm = '';
  showAddDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;
  showDetailsDialog = false;
  selected${entity_name_pascal}: ${model_name} | null = null;
  isLoading = false;

  constructor(private ${entity_name_camel}Service: ${service_name}) {}

  ngOnInit() {
    this.load${entity_name_pascal}s();
  }

  load${entity_name_pascal}s() {
    this.isLoading = true;
    this.${entity_name_camel}Service.list().subscribe({
      next: (response) => {
        if (!response.error && response.data) {
          this.${entity_plural} = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading ${entity_plural}:', error);
        this.isLoading = false;
      }
    });
  }

  get filtered${entity_name_pascal}s() {
    if (!this.searchTerm) {
      return this.${entity_plural};
    }
    const term = this.searchTerm.toLowerCase();
    return this.${entity_plural}.filter(item =>
      JSON.stringify(item).toLowerCase().includes(term)
    );
  }

  openAddDialog() {
    this.showAddDialog = true;
  }

  openEditDialog(item: ${model_name}) {
    this.selected${entity_name_pascal} = item;
    this.showEditDialog = true;
  }

  openDeleteDialog(item: ${model_name}) {
    this.selected${entity_name_pascal} = item;
    this.showDeleteDialog = true;
  }

  openDetailsDialog(item: ${model_name}) {
    this.selected${entity_name_pascal} = item;
    this.showDetailsDialog = true;
  }

  on${entity_name_pascal}Added(item: ${model_name}) {
    this.load${entity_name_pascal}s();
    this.showAddDialog = false;
  }

  on${entity_name_pascal}Updated(item: ${model_name}) {
    this.load${entity_name_pascal}s();
    this.showEditDialog = false;
    this.selected${entity_name_pascal} = null;
  }

  on${entity_name_pascal}Deleted() {
    this.load${entity_name_pascal}s();
    this.showDeleteDialog = false;
    this.selected${entity_name_pascal} = null;
  }
}
EOF

  # Generate main component HTML
  cat > "$component_dir/${entity_name_lower}.component.html" << 'EOF'
<div class="max-w-7xl mx-auto p-6">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
    <button
      (click)="openAddDialog()"
      class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
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
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr *ngIf="isLoading">
            <td colspan="3" class="px-6 py-4 text-center text-gray-500">Chargement...</td>
          </tr>
          <tr *ngIf="!isLoading && filteredItems.length === 0">
            <td colspan="3" class="px-6 py-4 text-center text-gray-500">Aucun élément trouvé</td>
          </tr>
          <tr *ngFor="let item of filteredItems" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.name || '-' }}</td>
            <td class="px-6 py-4">{{ item.description || '-' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <div class="flex items-center justify-end gap-2">
                <button
                  (click)="openDetailsDialog(item)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Voir les détails"
                >
                  <lucide-icon [img]="Eye" [size]="18"></lucide-icon>
                </button>
                <button
                  (click)="openEditDialog(item)"
                  class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Modifier"
                >
                  <lucide-icon [img]="Edit" [size]="18"></lucide-icon>
                </button>
                <button
                  (click)="openDeleteDialog(item)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Supprimer"
                >
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

<!-- Dialogs -->
<app-add-${entity_name_lower}-dialog
  [(open)]="showAddDialog"
  (itemAdded)="onItemAdded($event)"
></app-add-${entity_name_lower}-dialog>

<app-edit-${entity_name_lower}-dialog
  [(open)]="showEditDialog"
  [item]="selectedItem"
  (itemUpdated)="onItemUpdated($event)"
></app-edit-${entity_name_lower}-dialog>

<app-delete-${entity_name_lower}-confirmation
  [(open)]="showDeleteDialog"
  [item]="selectedItem"
  (itemDeleted)="onItemDeleted()"
></app-delete-${entity_name_lower}-confirmation>

<app-${entity_name_lower}-details-dialog
  [(open)]="showDetailsDialog"
  [item]="selectedItem"
></app-${entity_name_lower}-details-dialog>
EOF

  # Generate CSS
  cat > "$component_dir/${entity_name_lower}.component.css" << 'EOF'
/* Component-specific styles can be added here */
EOF

  echo -e "  ✓ Created main component files"
  echo -e "  Component: ${BLUE}${entity_name_pascal}Component${NC} created successfully!"
  echo ""
}

# System 4 - HR Reference Data
echo -e "${BLUE}Creating System 4 - HR Reference Data Components...${NC}"
echo ""

create_component "Hr Grades" "HrGradesService" "HRManagement" "HRGrade" "grades"
create_component "Hr Functions" "HrFunctionsService" "HRManagement" "HRFunction" "functions"
create_component "Trainings" "TrainingsService" "HRManagement" "Training" "trainings"
create_component "Awards" "AwardsService" "HRManagement" "Award" "awards"
create_component "Service Positions" "ServicePositionsService" "HRManagement" "ServicePosition" "positions"
create_component "Other Positions" "OtherPositionsService" "HRManagement" "OtherPosition" "positions"
create_component "Bml Companies" "BmlCompaniesService" "HRManagement" "BMLCompany" "companies"

echo -e "${GREEN}✓ System 4 HR Reference Data components created!${NC}"
echo ""

# System 4 - Agent History
echo -e "${BLUE}Creating System 4 - Agent History Components...${NC}"
echo ""

create_component "Agent Grade History" "AgentGradeHistoryService" "HRManagement" "AgentGradeHistory" "gradeHistory"
create_component "Agent Training History" "AgentTrainingHistoryService" "HRManagement" "AgentTrainingHistory" "trainingHistory"
create_component "Agent Award History" "AgentAwardHistoryService" "HRManagement" "AgentAwardHistory" "awardHistory"
create_component "Agent Function History" "AgentFunctionHistoryService" "HRManagement" "AgentFunctionHistory" "functionHistory"
create_component "Agent Company History" "AgentCompanyHistoryService" "HRManagement" "AgentCompanyHistory" "companyHistory"
create_component "Agent Service Position History" "AgentServicePositionHistoryService" "HRManagement" "AgentServicePositionHistory" "positionHistory"
create_component "Agent Other Position History" "AgentOtherPositionHistoryService" "HRManagement" "AgentOtherPositionHistory" "positionHistory"

echo -e "${GREEN}✓ System 4 Agent History components created!${NC}"
echo ""

# System 3 - Maritime Operations
echo -e "${BLUE}Creating System 3 - Maritime Operations Components...${NC}"
echo ""

create_component "Commercial Ships" "CommercialShipsService" "Maritime" "CommercialShip" "ships"
create_component "Naval Vessels" "NavalVesselsService" "Maritime" "NavalVessel" "vessels"
create_component "Security Agencies" "SecurityAgenciesService" "Maritime" "SecurityAgency" "agencies"
create_component "Armed Guard Missions" "ArmedGuardMissionsService" "Maritime" "ArmedGuardMission" "missions"
create_component "Escort Missions" "EscortMissionsService" "Maritime" "EscortMission" "missions"
create_component "Ship Arrival Departures" "ShipArrivalDeparturesService" "Maritime" "ShipArrivalDeparture" "arrivals"
create_component "Pal Entry Exits" "PalEntryExitsService" "Maritime" "PALEntryExit" "entries"
create_component "Ship Incidents" "ShipIncidentsService" "Maritime" "ShipIncident" "incidents"
create_component "Ship Provisionings" "ShipProvisioningsService" "Maritime" "ShipProvisioning" "provisionings"
create_component "Sts Operations" "StsOperationsService" "Maritime" "STSOperation" "operations"
create_component "Conservator Seizures" "ConservatorSeizuresService" "Maritime" "ConservatorSeizure" "seizures"
create_component "Personnel Allowances" "PersonnelAllowancesService" "Maritime" "PersonnelAllowance" "allowances"

echo -e "${GREEN}✓ System 3 Maritime Operations components created!${NC}"
echo ""

echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}✓ All components created successfully!${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""
echo "Next steps:"
echo "1. Update app.routes.ts to add routes for all new components"
echo "2. Update side-bar.component.ts to add navigation menu items"
echo "3. Create dialog components for each entity (add, edit, delete, details)"
echo ""
