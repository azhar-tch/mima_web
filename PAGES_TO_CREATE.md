# Pages à créer pour MIMA - Maquette complète

## ✅ Déjà créé:
- ✅ Dashboard (avec KPIs et statistiques)
- ✅ Login page
- ✅ Layout (Sidebar + Header)
- ✅ Agents component TypeScript (avec CRUD complet)

## 📋 À créer maintenant:

### 1. **Agents Page** (HTML Template)
Fonctionnalités:
- Liste des agents avec cartes
- Filtres (recherche, unité, statut, grade)
- Modal d'ajout
- Modal de modification
- Modal de détails
- Modal de suppression
- Toggle disponibilité

### 2. **Units Page**
Fonctionnalités:
- Liste des unités
- Ajout/Modification/Suppression d'unités
- Voir les agents d'une unité

### 3. **Missions Page**
Fonctionnalités:
- Liste des missions
- Formulaire de création de mission
- Assigner des agents à une mission
- Statuts: planifiée, en cours, terminée, annulée
- Filtres par date et statut

### 4. **Guards/Schedule Page**
Fonctionnalités:
- Calendrier mensuel
- Ajouter des gardes
- Types de gardes: jour, nuit, standby
- Voir les agents assignés par jour

### 5. **Absences Page**
Fonctionnalités:
- Liste des demandes d'absence
- Créer une demande
- Statuts: en attente, approuvée, refusée
- Dates de début et fin

### 6. **Alerts Page**
Fonctionnalités:
- Liste des alertes
- Types: critique, important, info
- Marquer comme lue
- Filtrer par type

### 7. **Rules Page**
Fonctionnalités:
- Liste des règles de gestion
- Ajouter/Modifier des règles
- Types de règles avec valeurs

### 8. **Notifications Page**
Fonctionnalités:
- Liste des notifications
- Marquer comme lue
- Filtrer par type

### 9. **Logout Functionality**
- Bouton déconnexion dans sidebar et header
- Redirection vers /login
- Clear storage (si besoin)

## 🎨 Design Pattern:
Toutes les pages suivent le même pattern:
1. En-tête avec titre + bouton d'action principal
2. Barre de filtres/recherche
3. Contenu principal (liste/grille/calendrier)
4. Modales pour CRUD
5. Tailwind CSS maritime theme
