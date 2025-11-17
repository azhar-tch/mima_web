#!/usr/bin/env python3
"""
Script pour générer tous les templates HTML des pages MIMA
Exécuter: python generate-templates.py
"""

import os

# Template HTML pour la page Agents (trop long pour un seul message)
agents_html = """<div class="space-y-6">
  <!-- Header -->
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Gestion des Agents</h1>
      <p class="text-gray-600 mt-1">Gérer le personnel maritime</p>
    </div>
    <button (click)="openAddModal()" class="flex items-center gap-2 px-4 py-2 bg-maritime-950 text-white rounded-lg hover:bg-maritime-900 transition-colors">
      <lucide-icon [img]="Plus" class="w-5 h-5"></lucide-icon>
      <span>Ajouter agent</span>
    </button>
  </div>

  <!-- Filters -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div class="md:col-span-2">
        <div class="relative">
          <lucide-icon [img]="Search" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"></lucide-icon>
          <input [(ngModel)]="searchTerm" type="text" placeholder="Rechercher un agent..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
        </div>
      </div>
      <select [(ngModel)]="filterUnit" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
        <option value="">Toutes les unités</option>
        <option *ngFor="let unit of units" [value]="unit">{{ unit }}</option>
      </select>
      <select [(ngModel)]="filterStatus" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
        <option value="">Tous les statuts</option>
        <option *ngFor="let status of statuses" [value]="status.value">{{ status.label }}</option>
      </select>
      <select [(ngModel)]="filterRank" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
        <option value="">Tous les grades</option>
        <option *ngFor="let rank of ranks" [value]="rank">{{ rank }}</option>
      </select>
    </div>
    <button *ngIf="searchTerm || filterUnit || filterStatus || filterRank" (click)="clearFilters()" class="mt-4 text-sm text-maritime-600 hover:text-maritime-700">
      Effacer les filtres
    </button>
  </div>

  <!-- Agents Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div *ngFor="let agent of filteredAgents" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div class="flex items-start justify-between mb-4">
        <img [src]="agent.photo" [alt]="agent.name" class="w-16 h-16 rounded-full">
        <span [class]="'px-3 py-1 rounded-full text-xs font-medium ' + getStatusColor(agent.status)">
          {{ getStatusLabel(agent.status) }}
        </span>
      </div>
      <h3 class="text-lg font-semibold text-gray-900">{{ agent.name }}</h3>
      <p class="text-sm text-gray-600">{{ agent.rank }}</p>
      <p class="text-sm text-gray-500 mt-1">{{ agent.registrationNo }}</p>
      <div class="mt-3 flex items-center justify-between">
        <span class="text-sm px-3 py-1 bg-maritime-100 text-maritime-800 rounded-full">{{ agent.unit }}</span>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" [checked]="agent.availability" (change)="toggleAvailability(agent)" class="sr-only peer">
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-maritime-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-maritime-600"></div>
        </label>
      </div>
      <div class="mt-4 flex gap-2">
        <button (click)="openDetailsModal(agent)" class="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <lucide-icon [img]="Eye" class="w-4 h-4"></lucide-icon>
          <span class="text-sm">Voir</span>
        </button>
        <button (click)="openEditModal(agent)" class="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <lucide-icon [img]="Edit" class="w-4 h-4"></lucide-icon>
          <span class="text-sm">Modifier</span>
        </button>
        <button (click)="openDeleteModal(agent)" class="flex items-center justify-center px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
          <lucide-icon [img]="Trash2" class="w-4 h-4"></lucide-icon>
        </button>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div *ngIf="filteredAgents.length === 0" class="text-center py-12">
    <p class="text-gray-500">Aucun agent trouvé</p>
  </div>
</div>

<!-- Add Modal -->
<div *ngIf="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <div class="bg-white rounded-lg max-w-md w-full p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-900">Ajouter un agent</h2>
      <button (click)="closeModals()" class="p-1 hover:bg-gray-100 rounded-lg">
        <lucide-icon [img]="X" class="w-6 h-6"></lucide-icon>
      </button>
    </div>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
        <input [(ngModel)]="agentForm.name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Grade</label>
        <select [(ngModel)]="agentForm.rank" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
          <option value="">Sélectionner</option>
          <option *ngFor="let rank of ranks" [value]="rank">{{ rank }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">N° d'immatriculation</label>
        <input [(ngModel)]="agentForm.registrationNo" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Unité</label>
        <select [(ngModel)]="agentForm.unit" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
          <option value="">Sélectionner</option>
          <option *ngFor="let unit of units" [value]="unit">{{ unit }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
        <select [(ngModel)]="agentForm.status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
          <option *ngFor="let status of statuses" [value]="status.value">{{ status.label }}</option>
        </select>
      </div>
      <div class="flex items-center">
        <input [(ngModel)]="agentForm.availability" type="checkbox" id="availability" class="w-4 h-4 text-maritime-600 border-gray-300 rounded focus:ring-maritime-500">
        <label for="availability" class="ml-2 text-sm text-gray-700">Disponible</label>
      </div>
    </div>
    <div class="mt-6 flex gap-3">
      <button (click)="closeModals()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Annuler</button>
      <button (click)="addAgent()" class="flex-1 px-4 py-2 bg-maritime-950 text-white rounded-lg hover:bg-maritime-900 transition-colors">Ajouter</button>
    </div>
  </div>
</div>

<!-- Edit Modal (similar to Add) -->
<div *ngIf="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <div class="bg-white rounded-lg max-w-md w-full p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-900">Modifier l'agent</h2>
      <button (click)="closeModals()" class="p-1 hover:bg-gray-100 rounded-lg">
        <lucide-icon [img]="X" class="w-6 h-6"></lucide-icon>
      </button>
    </div>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
        <input [(ngModel)]="agentForm.name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Grade</label>
        <select [(ngModel)]="agentForm.rank" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
          <option *ngFor="let rank of ranks" [value]="rank">{{ rank }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">N° d'immatriculation</label>
        <input [(ngModel)]="agentForm.registrationNo" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Unité</label>
        <select [(ngModel)]="agentForm.unit" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
          <option *ngFor="let unit of units" [value]="unit">{{ unit }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
        <select [(ngModel)]="agentForm.status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maritime-500 focus:border-maritime-500 outline-none">
          <option *ngFor="let status of statuses" [value]="status.value">{{ status.label }}</option>
        </select>
      </div>
      <div class="flex items-center">
        <input [(ngModel)]="agentForm.availability" type="checkbox" id="editAvailability" class="w-4 h-4 text-maritime-600 border-gray-300 rounded focus:ring-maritime-500">
        <label for="editAvailability" class="ml-2 text-sm text-gray-700">Disponible</label>
      </div>
    </div>
    <div class="mt-6 flex gap-3">
      <button (click)="closeModals()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Annuler</button>
      <button (click)="updateAgent()" class="flex-1 px-4 py-2 bg-maritime-950 text-white rounded-lg hover:bg-maritime-900 transition-colors">Enregistrer</button>
    </div>
  </div>
</div>

<!-- Delete Modal -->
<div *ngIf="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <div class="bg-white rounded-lg max-w-md w-full p-6">
    <h2 class="text-xl font-bold text-gray-900 mb-4">Supprimer l'agent</h2>
    <p class="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer <strong>{{ selectedAgent?.name }}</strong> ? Cette action est irréversible.</p>
    <div class="flex gap-3">
      <button (click)="closeModals()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Annuler</button>
      <button (click)="deleteAgent()" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Supprimer</button>
    </div>
  </div>
</div>

<!-- Details Modal -->
<div *ngIf="showDetailsModal && selectedAgent" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <div class="bg-white rounded-lg max-w-md w-full p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-900">Détails de l'agent</h2>
      <button (click)="closeModals()" class="p-1 hover:bg-gray-100 rounded-lg">
        <lucide-icon [img]="X" class="w-6 h-6"></lucide-icon>
      </button>
    </div>
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <img [src]="selectedAgent.photo" [alt]="selectedAgent.name" class="w-20 h-20 rounded-full">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">{{ selectedAgent.name }}</h3>
          <p class="text-sm text-gray-600">{{ selectedAgent.rank }}</p>
        </div>
      </div>
      <div class="border-t border-gray-200 pt-4 space-y-3">
        <div class="flex justify-between">
          <span class="text-sm font-medium text-gray-600">N° Immatriculation:</span>
          <span class="text-sm text-gray-900">{{ selectedAgent.registrationNo }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm font-medium text-gray-600">Unité:</span>
          <span class="text-sm text-gray-900">{{ selectedAgent.unit }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm font-medium text-gray-600">Statut:</span>
          <span [class]="'text-sm px-3 py-1 rounded-full ' + getStatusColor(selectedAgent.status)">
            {{ getStatusLabel(selectedAgent.status) }}
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm font-medium text-gray-600">Disponibilité:</span>
          <span class="text-sm text-gray-900">{{ selectedAgent.availability ? 'Disponible' : 'Indisponible' }}</span>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <button (click)="closeModals()" class="w-full px-4 py-2 bg-maritime-950 text-white rounded-lg hover:bg-maritime-900 transition-colors">Fermer</button>
    </div>
  </div>
</div>
"""

# Écrire le template
base_path = "src/app/agents"
os.makedirs(base_path, exist_ok=True)

with open(f"{base_path}/agents.component.html", "w", encoding="utf-8") as f:
    f.write(agents_html)

print("✅ Template agents.component.html créé avec succès!")
print("\n📋 Pour créer les autres templates, exécutez les autres scripts ou utilisez v0.dev")
