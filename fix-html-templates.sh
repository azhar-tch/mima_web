#!/bin/bash

APP_DIR="/home/user/mima_web/src/app"

# Fix hr-functions templates
cat > "$APP_DIR/hr-functions/edit-function-dialog/edit-function-dialog.component.html" << 'EOF'
<div class="fixed inset-0 z-50 flex items-center justify-center">
  <div class="fixed inset-0 bg-black/50" (click)="handleClose()"></div>
  <div class="relative bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 p-6 z-50 max-h-[90vh] overflow-y-auto">
    <div class="mb-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Modifier la fonction</h2>
          <p class="text-sm text-gray-500 mt-1">Modifiez les informations de la fonction</p>
        </div>
        <button (click)="handleClose()" class="text-gray-400 hover:text-gray-600 transition-colors">
          <lucide-icon [img]="X" [size]="20"></lucide-icon>
        </button>
      </div>
    </div>
    <div class="grid gap-4">
      <div class="grid gap-2">
        <label for="functionName" class="text-sm font-medium text-gray-700">Nom de la fonction *</label>
        <input id="functionName" type="text" [(ngModel)]="formData.functionName"
          [class]="'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' + (errors['functionName'] ? 'border-red-500' : 'border-gray-300')"/>
        <p *ngIf="errors['functionName']" class="text-red-500 text-sm">{{ errors['functionName'] }}</p>
      </div>
      <div class="grid gap-2">
        <label for="department" class="text-sm font-medium text-gray-700">Département</label>
        <input id="department" type="text" [(ngModel)]="formData.department"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <div class="grid gap-2">
        <label for="description" class="text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" [(ngModel)]="formData.description"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
      </div>
    </div>
    <div class="flex justify-end gap-3 mt-6">
      <button (click)="handleClose()" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">Annuler</button>
      <button (click)="handleSubmit()" class="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors">Enregistrer</button>
    </div>
  </div>
</div>
EOF

# Fix trainings templates
cat > "$APP_DIR/trainings/add-training-dialog/add-training-dialog.component.html" << 'EOF'
<div class="fixed inset-0 z-50 flex items-center justify-center">
  <div class="fixed inset-0 bg-black/50" (click)="handleClose()"></div>
  <div class="relative bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 p-6 z-50 max-h-[90vh] overflow-y-auto">
    <div class="mb-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Ajouter une formation</h2>
          <p class="text-sm text-gray-500 mt-1">Créez une nouvelle formation</p>
        </div>
        <button (click)="handleClose()" class="text-gray-400 hover:text-gray-600 transition-colors">
          <lucide-icon [img]="X" [size]="20"></lucide-icon>
        </button>
      </div>
    </div>
    <div class="grid gap-4">
      <div class="grid gap-2">
        <label for="trainingName" class="text-sm font-medium text-gray-700">Nom de la formation *</label>
        <input id="trainingName" type="text" placeholder="Ex: Formation maritime, Formation sécurité..." [(ngModel)]="formData.trainingName"
          [class]="'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' + (errors['trainingName'] ? 'border-red-500' : 'border-gray-300')"/>
        <p *ngIf="errors['trainingName']" class="text-red-500 text-sm">{{ errors['trainingName'] }}</p>
      </div>
      <div class="grid gap-2">
        <label for="trainingType" class="text-sm font-medium text-gray-700">Type de formation</label>
        <input id="trainingType" type="text" [(ngModel)]="formData.trainingType"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <div class="grid gap-2">
        <label for="institution" class="text-sm font-medium text-gray-700">Institution</label>
        <input id="institution" type="text" [(ngModel)]="formData.institution"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <div class="grid gap-2">
        <label for="country" class="text-sm font-medium text-gray-700">Pays</label>
        <input id="country" type="text" [(ngModel)]="formData.country"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <div class="grid gap-2">
        <label for="description" class="text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" [(ngModel)]="formData.description"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
      </div>
    </div>
    <div class="flex justify-end gap-3 mt-6">
      <button (click)="handleClose()" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">Annuler</button>
      <button (click)="handleSubmit()" class="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors">Ajouter</button>
    </div>
  </div>
</div>
EOF

echo "✅ HTML templates fixed!"
