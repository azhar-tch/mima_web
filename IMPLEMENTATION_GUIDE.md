# Guide d'implémentation MIMA - Templates Complets

## 📊 État actuel

### ✅ Complété:
1. **Structure du projet Angular** créée
2. **Tailwind CSS** configuré
3. **Sidebar** avec navigation et icônes
4. **Header** avec recherche et menu utilisateur
5. **Main Layout** intégrant sidebar + header
6. **Routing** configuré pour toutes les pages
7. **Dashboard** avec KPIs et activités
8. **Login page** avec design maritime
9. **Agents Component TypeScript** avec toutes les méthodes CRUD

### 🔄 En cours:
- Templates HTML pour chaque page avec données statiques

## 🎯 Prochaines étapes

### Option 1: Utiliser v0.dev pour générer chaque page

Pour chaque page, utilisez v0.dev avec les prompts suivants:

#### **Prompt pour Agents Page:**
```
Create an agents management page for maritime personnel with Tailwind CSS:
- Header with "Gestion des Agents" title and blue "Ajouter agent" button with plus icon
- Filter bar with search input, unit dropdown, status dropdown, rank dropdown, and "Effacer filtres" button
- Agents displayed as cards in 3-column grid:
  - Agent photo/avatar
  - Name and rank
  - Registration number (MAR001 format)
  - Unit name with badge
  - Status badge (green=disponible, blue=en mission, gray=repos, orange=congé)
  - Availability toggle switch
  - Three action buttons: View (eye icon), Edit (pencil icon), Delete (trash icon)

Add 4 modals:
1. Add Agent Modal: form with name, rank, registration no, unit dropdown, status dropdown, availability checkbox
2. Edit Agent Modal: same form pre-filled
3. Delete Confirmation Modal: "Êtes-vous sûr de vouloir supprimer cet agent?" with Cancel and Delete buttons
4. Agent Details Modal: display all agent info in read-only format

Use navy blue (#1e3a8a) as primary color. Make it responsive.
```

#### **Prompt pour Units Page:**
```
Create a units management page with Tailwind CSS:
- Header with "Gestion des Unités" and "Ajouter unité" button
- Table view with columns: Name, Description, Number of agents, Status, Actions
- Add/Edit/Delete modals
- Show agents assigned to each unit
- Navy blue theme
```

#### **Prompt pour Missions Page:**
```
Create a missions management page with Tailwind CSS:
- Header with "Gestion des Missions" and "Nouvelle mission" button
- Mission cards showing: ship name, mission type, dates, assigned agents (avatars), status badge
- Filter by status: planifiée, en cours, terminée, annulée
- Add Mission Modal with: mission type dropdown, ship name, description, date range, assign agents multi-select, priority radio buttons
- Status color coding: blue=planifiée, orange=en cours, green=terminée, red=annulée
```

#### **Prompt pour Guards/Schedule Page:**
```
Create a duty schedule calendar with Tailwind CSS:
- Month view calendar
- Navigation arrows for month change
- Each day cell shows agents on duty with small avatars
- Color-coded by shift type: yellow=day shift, blue=night shift, green=standby
- Click day to open sidebar showing full schedule for that day
- Add duty button that opens modal to assign agent, select date, select shift type
- Legend showing shift type colors
```

### Option 2: Je continue à créer les templates manuellement

Je peux créer chaque page avec du code HTML/TypeScript complet. Dites-moi si vous voulez que je:
1. Crée TOUS les templates HTML maintenant (cela prendra plusieurs messages)
2. Crée seulement les pages prioritaires
3. Vous guide pour utiliser v0.dev pour générer et adapter

## 🚀 Implémentation de la déconnexion

Pour implémenter la déconnexion, voici ce qu'il faut faire:

### 1. Créer un Auth Service

```typescript
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  logout() {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Redirect to login
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    // Check if user is authenticated
    return !!localStorage.getItem('authToken');
  }
}
```

### 2. Mettre à jour le Sidebar

```typescript
// Dans side-bar.component.ts
import { AuthService } from '../services/auth.service';

constructor(private authService: AuthService) {}

logout() {
  this.authService.logout();
}
```

### 3. Mettre à jour le Header

```typescript
// Dans header.component.ts
import { AuthService } from '../services/auth.service';

constructor(private authService: AuthService) {}

logout() {
  this.authService.logout();
  this.isUserMenuOpen = false;
}
```

### 4. Créer un Auth Guard (optionnel)

```typescript
// src/app/auth-guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/login');
};
```

Ensuite, ajoutez le guard aux routes dans `app.routes.ts`:
```typescript
{
  path: '',
  component: MainLayoutComponent,
  canActivate: [authGuard],  // Ajoutez cette ligne
  children: [...]
}
```

## 📝 Commandes à exécuter

```bash
# Créer le service d'authentification
cd "e:/Projets/Gestion des missions, gardes et absences du personnel maritime/Web/mima"
ng generate service services/auth --skip-tests

# Créer le guard
ng generate guard auth-guards/auth --skip-tests
```

## ✨ Prochaine action recommandée

Dites-moi comment vous voulez procéder:
- **A**: Je crée manuellement tous les templates HTML (long mais complet)
- **B**: Je crée seulement les pages prioritaires (Agents, Missions, Guards)
- **C**: Je vous guide pour utiliser v0.dev et adapter les composants
- **D**: Je me concentre sur la déconnexion et les services d'abord

Quelle option préférez-vous?
