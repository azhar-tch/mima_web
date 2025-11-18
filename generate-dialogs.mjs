#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

const APP_PATH = '/home/user/mima_web/src/app';

// Configuration for each component type
const componentConfigs = [
  // HR Management Components
  {
    name: 'hr-functions',
    displayName: 'Fonctions RH',
    description: 'Gérez les fonctions du personnel',
    modelName: 'HRFunction',
    requestName: 'HRFunctionRequest',
    modelImport: '../models/HRManagement',
    serviceName: 'HrFunctionsService',
    serviceImport: '../services/hr-functions/hr-functions.service',
    primaryField: 'functionName',
    primaryLabel: 'Nom de la fonction',
    primaryPlaceholder: 'Ex: Chef de section, Responsable sécurité...',
    fields: [
      { name: 'functionName', label: 'Nom de la fonction', type: 'text', required: true },
      { name: 'department', label: 'Département', type: 'text', required: false },
      { name: 'description', label: 'Description', type: 'textarea', required: false }
    ]
  },
  {
    name: 'trainings',
    displayName: 'Formations',
    description: 'Gérez les formations disponibles',
    modelName: 'Training',
    requestName: 'TrainingRequest',
    modelImport: '../models/HRManagement',
    serviceName: 'TrainingsService',
    serviceImport: '../services/trainings/trainings.service',
    primaryField: 'trainingName',
    primaryLabel: 'Nom de la formation',
    primaryPlaceholder: 'Ex: Formation maritime, Formation sécurité...',
    fields: [
      { name: 'trainingName', label: 'Nom de la formation', type: 'text', required: true },
      { name: 'trainingType', label: 'Type de formation', type: 'text', required: false },
      { name: 'institution', label: 'Institution', type: 'text', required: false },
      { name: 'country', label: 'Pays', type: 'text', required: false },
      { name: 'description', label: 'Description', type: 'textarea', required: false }
    ]
  },
  {
    name: 'awards',
    displayName: 'Distinctions',
    description: 'Gérez les distinctions et récompenses',
    modelName: 'Award',
    requestName: 'AwardRequest',
    modelImport: '../models/HRManagement',
    serviceName: 'AwardsService',
    serviceImport: '../services/awards/awards.service',
    primaryField: 'awardName',
    primaryLabel: 'Nom de la distinction',
    primaryPlaceholder: 'Ex: Médaille du mérite, Médaille d\'honneur...',
    fields: [
      { name: 'awardName', label: 'Nom de la distinction', type: 'text', required: true },
      { name: 'awardType', label: 'Type de distinction', type: 'text', required: false },
      { name: 'description', label: 'Description', type: 'textarea', required: false }
    ]
  },
  {
    name: 'service-positions',
    displayName: 'Postes de service',
    description: 'Gérez les postes de service',
    modelName: 'ServicePosition',
    requestName: 'ServicePositionRequest',
    modelImport: '../models/HRManagement',
    serviceName: 'ServicePositionsService',
    serviceImport: '../services/service-positions/service-positions.service',
    primaryField: 'positionName',
    primaryLabel: 'Nom du poste',
    primaryPlaceholder: 'Ex: Commandant de bord, Chef mécanicien...',
    fields: [
      { name: 'positionName', label: 'Nom du poste', type: 'text', required: true },
      { name: 'positionType', label: 'Type de poste', type: 'text', required: false },
      { name: 'location', label: 'Localisation', type: 'text', required: false },
      { name: 'unit', label: 'Unité', type: 'text', required: false },
      { name: 'description', label: 'Description', type: 'textarea', required: false }
    ]
  },
  {
    name: 'other-positions',
    displayName: 'Autres postes',
    description: 'Gérez les autres postes',
    modelName: 'OtherPosition',
    requestName: 'OtherPositionRequest',
    modelImport: '../models/HRManagement',
    serviceName: 'OtherPositionsService',
    serviceImport: '../services/other-positions/other-positions.service',
    primaryField: 'positionName',
    primaryLabel: 'Nom du poste',
    primaryPlaceholder: 'Ex: Consultant, Expert...',
    fields: [
      { name: 'positionName', label: 'Nom du poste', type: 'text', required: true },
      { name: 'positionType', label: 'Type de poste', type: 'text', required: false },
      { name: 'description', label: 'Description', type: 'textarea', required: false }
    ]
  },
  {
    name: 'bml-companies',
    displayName: 'Compagnies BML',
    description: 'Gérez les compagnies BML',
    modelName: 'BMLCompany',
    requestName: 'BMLCompanyRequest',
    modelImport: '../models/HRManagement',
    serviceName: 'BmlCompaniesService',
    serviceImport: '../services/bml-companies/bml-companies.service',
    primaryField: 'companyName',
    primaryLabel: 'Nom de la compagnie',
    primaryPlaceholder: 'Ex: BML1, BML2...',
    fields: [
      { name: 'companyName', label: 'Nom de la compagnie', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: false }
    ]
  }
];

// Generate TypeScript component file
function generateAddDialogTS(config) {
  const pascalName = config.name.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');

  const formDataInit = config.fields.map(f => {
    if (f.type === 'number') return `${f.name}: undefined`;
    return `${f.name}: ''`;
  }).join(',\n    ');

  const validationRules = config.fields
    .filter(f => f.required)
    .map(f => {
      if (f.type === 'number') {
        return `if (this.formData.${f.name} === undefined || this.formData.${f.name} === null) {
      newErrors['${f.name}'] = '${f.label} est requis';
    }`;
      }
      return `if (!this.formData.${f.name} || !this.formData.${f.name}.trim()) {
      newErrors['${f.name}'] = '${f.label} est requis';
    }`;
    })
    .join('\n    ');

  return `import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { ${config.requestName} } from '${config.modelImport}';

@Component({
  selector: 'app-add-${config.name}-dialog',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './add-${config.name}-dialog.component.html',
  styleUrl: './add-${config.name}-dialog.component.css'
})
export class Add${pascalName}DialogComponent {
  readonly X = X;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<${config.requestName}>();

  formData: ${config.requestName} = {
    ${formDataInit}
  };

  errors: Record<string, string> = {};

  handleReset() {
    this.formData = {
      ${formDataInit}
    };
    this.errors = {};
  }

  handleClose() {
    this.close.emit();
    this.handleReset();
  }

  validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    ${validationRules}

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
`;
}

// Generate HTML template for add dialog
function generateAddDialogHTML(config) {
  const fieldsHTML = config.fields.map(field => {
    const errorClass = `(errors['${field.name}'] ? 'border-red-500' : 'border-gray-300')`;

    if (field.type === 'textarea') {
      return `      <!-- ${field.label} -->
      <div class="grid gap-2">
        <label for="${field.name}" class="text-sm font-medium text-gray-700">${field.label}${field.required ? ' *' : ''}</label>
        <textarea
          id="${field.name}"
          placeholder="${field.placeholder || field.label}"
          [(ngModel)]="formData.${field.name}"
          [class]="'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' + ${errorClass}"
          rows="3"
        ></textarea>
        <p *ngIf="errors['${field.name}']" class="text-red-500 text-sm">{{ errors['${field.name}'] }}</p>
      </div>`;
    } else {
      return `      <!-- ${field.label} -->
      <div class="grid gap-2">
        <label for="${field.name}" class="text-sm font-medium text-gray-700">${field.label}${field.required ? ' *' : ''}</label>
        <input
          id="${field.name}"
          type="${field.type || 'text'}"
          ${field.type === 'number' ? 'min="0"' : ''}
          placeholder="${field.placeholder || field.label}"
          [(ngModel)]="formData.${field.name}"
          [class]="'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' + ${errorClass}"/>
        <p *ngIf="errors['${field.name}']" class="text-red-500 text-sm">{{ errors['${field.name}'] }}</p>
      </div>`;
    }
  }).join('\n\n');

  return `<div class="fixed inset-0 z-50 flex items-center justify-center">
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-black/50" (click)="handleClose()"></div>

  <!-- Dialog Content -->
  <div class="relative bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 p-6 z-50 max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="mb-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Ajouter ${config.displayName.toLowerCase()}</h2>
          <p class="text-sm text-gray-500 mt-1">Créez un nouveau ${config.displayName.toLowerCase().slice(0, -1)}</p>
        </div>
        <button
          (click)="handleClose()"
          class="text-gray-400 hover:text-gray-600 transition-colors">
          <lucide-icon [img]="X" [size]="20"></lucide-icon>
        </button>
      </div>
    </div>

    <!-- Form -->
    <div class="grid gap-4">
${fieldsHTML}
    </div>

    <!-- Footer -->
    <div class="flex justify-end gap-3 mt-6">
      <button
        (click)="handleClose()"
        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
        Annuler
      </button>
      <button
        (click)="handleSubmit()"
        class="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors">
        Ajouter
      </button>
    </div>
  </div>
</div>
`;
}

// Generate spec file
function generateSpecFile(componentName, className) {
  return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${className} } from './${componentName}.component';

describe('${className}', () => {
  let component: ${className};
  let fixture: ComponentFixture<${className}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [${className}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(${className});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
`;
}

// Process each component
function generateDialogsForComponent(config) {
  const componentPath = join(APP_PATH, config.name);
  console.log(`Generating dialogs for: ${config.name}`);

  const pascalName = config.name.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');

  // Create add dialog directory and files
  const addDialogDir = join(componentPath, `add-${config.name}-dialog`);
  if (!existsSync(addDialogDir)) mkdirSync(addDialogDir, { recursive: true });

  writeFileSync(
    join(addDialogDir, `add-${config.name}-dialog.component.ts`),
    generateAddDialogTS(config)
  );

  writeFileSync(
    join(addDialogDir, `add-${config.name}-dialog.component.html`),
    generateAddDialogHTML(config)
  );

  writeFileSync(join(addDialogDir, `add-${config.name}-dialog.component.css`), '');

  writeFileSync(
    join(addDialogDir, `add-${config.name}-dialog.component.spec.ts`),
    generateSpecFile(`add-${config.name}-dialog`, `Add${pascalName}DialogComponent`)
  );

  console.log(`  ✓ Created add dialog`);
}

// Main execution
console.log('Starting dialog generation...\n');

componentConfigs.forEach(config => {
  try {
    generateDialogsForComponent(config);
  } catch (error) {
    console.error(`Error generating dialogs for ${config.name}:`, error.message);
  }
});

console.log('\n✅ Dialog generation complete!');
