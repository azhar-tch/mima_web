# Guide Complet des Prompts v0.dev pour MIMA

## 🎯 Instructions générales

1. **Allez sur https://v0.dev**
2. **Copiez-collez chaque prompt** ci-dessous
3. **Téléchargez le code généré** (bouton "Copy code")
4. **Copiez uniquement le HTML** dans le fichier `.component.html` correspondant
5. **Les TypeScript components sont déjà créés** - ne modifiez que le HTML

---

## 📋 Prompt 1: Page Agents (PRIORITAIRE)

```
Create a maritime personnel agents management page using Tailwind CSS and Angular template syntax:

HEADER:
- Title "Gestion des Agents" with subtitle "Gérer le personnel maritime"
- Blue button "Ajouter agent" with plus icon on the right

FILTERS BAR (white card with border):
- Search input with search icon (spans 2 columns)
- Unit dropdown (Toutes les unités, Unité Alpha, Unité Bravo, Unité Charlie, Unité Delta)
- Status dropdown (Tous les statuts, Disponible, En mission, Repos, Congé)
- Rank dropdown (Tous les grades, Capitaine, Lieutenant, Sergent, Matelot)
- "Effacer les filtres" link below if any filter is active

AGENTS GRID (3 columns responsive):
Each agent card shows:
- Avatar image (top left) + Status badge (top right)
  - Green badge "Disponible" for disponible
  - Blue badge "En mission" for en_mission
  - Gray badge "Repos" for repos
  - Orange badge "Congé" for conge
- Name (large, bold)
- Rank (medium, gray)
- Registration number (small, lighter gray)
- Unit badge (blue background, pill shape)
- Availability toggle switch
- 3 action buttons in a row:
  - "Voir" with eye icon (gray border)
  - "Modifier" with edit icon (gray border)
  - Delete button with trash icon (red border)

Use *ngFor="let agent of filteredAgents" for the grid
Use (click)="openAddModal()" for add button
Use (click)="openEditModal(agent)" for edit
Use (click)="openDeleteModal(agent)" for delete
Use (click)="openDetailsModal(agent)" for view
Use (change)="toggleAvailability(agent)" for toggle
Use [(ngModel)] for all filter inputs
Use lucide-angular icons: Plus, Search, Edit, Trash2, Eye, X

MODALS (4 total):

1. ADD MODAL (*ngIf="showAddModal"):
- Overlay with backdrop
- White rounded card centered
- Header with "Ajouter un agent" title + X close button
- Form fields:
  - Nom complet (text input) [(ngModel)]="agentForm.name"
  - Grade (select dropdown) [(ngModel)]="agentForm.rank"
  - N° d'immatriculation (text input) [(ngModel)]="agentForm.registrationNo"
  - Unité (select dropdown) [(ngModel)]="agentForm.unit"
  - Statut (select dropdown) [(ngModel)]="agentForm.status"
  - Disponible (checkbox) [(ngModel)]="agentForm.availability"
- Footer: "Annuler" (gray) + "Ajouter" (blue) buttons
- (click)="closeModals()" for cancel
- (click)="addAgent()" for submit

2. EDIT MODAL (*ngIf="showEditModal"):
- Same as ADD but title "Modifier l'agent"
- Same form fields pre-filled
- Submit button says "Enregistrer"
- (click)="updateAgent()" for submit

3. DELETE MODAL (*ngIf="showDeleteModal"):
- Simpler modal
- Title "Supprimer l'agent"
- Text: "Êtes-vous sûr de vouloir supprimer {{selectedAgent?.name}}? Cette action est irréversible."
- "Annuler" (gray) + "Supprimer" (red) buttons
- (click)="deleteAgent()" for confirm

4. DETAILS MODAL (*ngIf="showDetailsModal && selectedAgent"):
- Avatar + name + rank at top
- Border separator
- Read-only info rows:
  - N° Immatriculation: {{selectedAgent.registrationNo}}
  - Unité: {{selectedAgent.unit}}
  - Statut: badge with getStatusColor()
  - Disponibilité: {{selectedAgent.availability ? 'Disponible' : 'Indisponible'}}
- "Fermer" button (blue, full width)

EMPTY STATE:
Show when filteredAgents.length === 0:
"Aucun agent trouvé" centered text

COLOR SCHEME:
- Primary: #1e3a8a (navy blue)
- Green: #22c55e (disponible)
- Blue: #3b82f6 (en mission)
- Gray: #6b7280 (repos)
- Orange: #f97316 (congé)
- Red: #ef4444 (delete)

Make it fully responsive (mobile-first).
Use Angular template syntax (*ngIf, *ngFor, (click), [(ngModel)]).
```

---

## 📋 Prompt 2: Page Units

```
Create a maritime units management page using Tailwind CSS and Angular:

HEADER:
- Title "Gestion des Unités"
- Blue "Ajouter unité" button with plus icon

SEARCH BAR:
- Search input with icon

UNITS TABLE:
Columns: Nom | Description | Nb d'agents | Statut | Actions
- Each row shows unit data
- Status badge (green=Active, gray=Inactive)
- Actions: View (eye), Edit (pencil), Delete (trash) icons

Use *ngFor="let unit of filteredUnits"

Sample static data structure:
- name: string
- description: string
- agentCount: number
- status: 'active' | 'inactive'

MODALS:
1. Add Unit Modal
2. Edit Unit Modal
3. Delete Confirmation Modal
4. Unit Details Modal showing assigned agents list

Use same modal pattern as Agents page.
Navy blue theme (#1e3a8a).
```

---

## 📋 Prompt 3: Page Missions

```
Create a maritime missions management page using Tailwind CSS and Angular:

HEADER:
- Title "Gestion des Missions"
- Blue "Nouvelle mission" button

FILTERS:
- Search bar
- Status filter: Toutes, Planifiée, En cours, Terminée, Annulée

MISSIONS CARDS (2 columns grid):
Each card shows:
- Ship name (large, bold)
- Mission type badge
- Date range (start - end)
- Assigned agents (small avatar circles, max 3 visible + "+2" badge)
- Status badge:
  - Blue "Planifiée" for planifiee
  - Orange "En cours" for en_cours
  - Green "Terminée" for terminee
  - Red "Annulée" for annulee
- Priority indicator (small circle: gray=low, yellow=medium, orange=high, red=critical)
- Action buttons: View, Edit, Delete

Use *ngFor="let mission of filteredMissions"

ADD MISSION MODAL fields:
- Type de mission (dropdown: Transport, Surveillance, Maintenance, Urgence)
- Nom du navire (text)
- Description (textarea)
- Date de début (date input)
- Date de fin (date input)
- Assigner des agents (multi-select with checkboxes)
- Priorité (radio buttons: Basse, Normale, Haute, Critique)
- Localisation (text with map pin icon)
- Notes (textarea, optional)

Same modal patterns as Agents page.
Navy blue theme.
```

---

## 📋 Prompt 4: Page Guards/Schedule (Calendrier)

```
Create a maritime duty schedule calendar page using Tailwind CSS and Angular:

HEADER:
- Title "Planning des Gardes"
- Month navigation: < October 2024 >
- "Ajouter garde" blue button
- View toggle: "Vue mensuelle" / "Vue hebdomadaire"

CALENDAR GRID (7 columns for days):
- Day headers: Lun, Mar, Mer, Jeu, Ven, Sam, Dim
- Each day cell shows:
  - Day number
  - Small colored bars for each duty:
    - Yellow bar = "Jour" (day shift)
    - Blue bar = "Nuit" (night shift)
    - Green bar = "Astreinte" (standby)
  - Tiny agent avatars (max 2 visible)
  - Click opens sidebar

LEGEND (below calendar):
- Yellow square "Garde de jour"
- Blue square "Garde de nuit"
- Green square "Astreinte"

DAY DETAILS SIDEBAR (slides in when day clicked):
- Date header
- List of all agents on duty that day
- Each agent shows: avatar, name, shift type, time
- "Ajouter garde" button
- Close X button

ADD DUTY MODAL:
- Select agent (dropdown)
- Select date (date picker)
- Select shift type (radio: Jour, Nuit, Astreinte)
- Time range (start - end)
- Notes (optional textarea)

Use *ngFor for calendar days
Use (click)="selectDay(day)" for day cells
Navy blue theme.
```

---

## 📋 Prompt 5: Page Absences

```
Create a maritime personnel absences management page using Tailwind CSS and Angular:

HEADER:
- Title "Gestion des Absences"
- Blue "Nouvelle demande" button

FILTERS:
- Search bar
- Status filter: Toutes, En attente, Approuvée, Refusée
- Type filter: Tous types, Congé, Maladie, Formation, Autre

ABSENCES TABLE:
Columns: Agent | Type | Du | Au | Jours | Statut | Actions
- Agent column: avatar + name
- Type badge (blue pill)
- Date range
- Number of days calculated
- Status badge:
  - Orange "En attente" for pending
  - Green "Approuvée" for approved
  - Red "Refusée" for rejected
- Actions: View, Edit if pending, Delete if pending

Use *ngFor="let absence of filteredAbsences"

ADD ABSENCE MODAL:
- Select agent (dropdown)
- Type d'absence (dropdown: Congé, Maladie, Formation, Autre)
- Date de début (date input)
- Date de fin (date input)
- Motif (textarea)
- Document justificatif (file upload, optional)

APPROVE/REJECT buttons for pending absences in details modal.

Navy blue theme.
```

---

## 📋 Prompt 6: Page Alerts

```
Create a maritime alerts page using Tailwind CSS and Angular:

HEADER:
- Title "Alertes"
- Filter buttons: Toutes, Critiques, Importantes, Informations

ALERTS LIST (stacked cards):
Each alert card shows:
- Left colored border (red=critique, orange=important, blue=info)
- Icon (alert circle for critique, info circle for others)
- Title (bold)
- Description
- Timestamp
- Mark as read checkbox
- Dismiss X button

Use *ngFor="let alert of filteredAlerts"

Color coding:
- Critical: red border + background
- Important: orange border + background
- Info: blue border + background

EMPTY STATE:
"Aucune alerte" when no alerts

Simple design, no modals needed.
Navy blue theme.
```

---

## 📋 Prompt 7: Page Rules

```
Create a maritime management rules page using Tailwind CSS and Angular:

HEADER:
- Title "Règles de Gestion"
- Blue "Ajouter règle" button

RULES TABLE:
Columns: Titre de la règle | Valeur | Unité | Description | Actions
- Rule title
- Value (numeric)
- Unit of measure
- Description text
- Actions: Edit, Delete

Use *ngFor="let rule of rules"

ADD/EDIT RULE MODAL:
- Titre de la règle (text)
- Valeur (number input)
- Unité de mesure (dropdown: heures, jours, %, €, etc.)
- Description (textarea)

Simple table layout.
Navy blue theme.
```

---

## 📋 Prompt 8: Page Notifications

```
Create a maritime notifications page using Tailwind CSS and Angular:

HEADER:
- Title "Notifications"
- "Tout marquer comme lu" link on the right

FILTERS:
- Toutes, Non lues, Lues
- Type filter: Tous types, Missions, Gardes, Absences, Système

NOTIFICATIONS LIST (stacked):
Each notification shows:
- Blue dot if unread
- Icon based on type
- Title (bold)
- Message
- Timestamp (relative: "il y a 2h")
- Click to mark as read

Use *ngFor="let notif of filteredNotifications"

Color unread notifications with light blue background.

EMPTY STATE:
"Aucune notification" centered

Simple list design, no modals.
Navy blue theme.
```

---

## 🎨 Conseils pour adaptation

Après avoir généré chaque page avec v0.dev:

1. **Copiez le HTML uniquement** - Le TypeScript est déjà prêt
2. **Remplacez les noms de variables** si nécessaire pour correspondre au component TypeScript
3. **Ajoutez les imports manquants** dans le component TypeScript si v0 utilise de nouveaux icons
4. **Testez la page** - Les données statiques s'afficheront
5. **Ajustez les couleurs** si besoin pour correspondre au thème maritime

## ✅ Checklist de vérification

Pour chaque page générée, vérifiez:
- [ ] Les *ngFor loops utilisent les bonnes variables
- [ ] Les (click) handlers correspondent aux méthodes du component
- [ ] Les [(ngModel)] bindings existent dans le component
- [ ] Les icons lucide-angular sont importés
- [ ] Les modales utilisent *ngIf avec les bonnes variables
- [ ] Le responsive design fonctionne (testez en mobile)

## 🚀 Ordre recommandé de génération

1. **Agents** (le plus complexe, pattern de référence) ✅ Déjà créé
2. **Missions** (deuxième plus important)
3. **Guards/Schedule** (calendrier, plus complexe)
4. **Units** (simple, bon pour tester)
5. **Absences** (pattern similaire à Missions)
6. **Alerts** (très simple)
7. **Rules** (table basique)
8. **Notifications** (liste simple)

Bon travail! 🎉
