# Guide de Sécurité - MIMA

## Fonctionnalités de Sécurité Implémentées

### 1. 🔐 AuthGuard (Protection des Routes)

**Emplacement**: `src/app/guards/auth.guard.ts`

**Fonctionnalité**:
- Bloque l'accès aux routes protégées si l'utilisateur n'est pas connecté
- Vérifie automatiquement si le token JWT est expiré
- Redirige vers `/login` avec l'URL de retour si non authentifié

**Utilisation**:
```typescript
// Dans app.routes.ts
{
  path: '',
  component: MainLayoutComponent,
  canActivate: [AuthGuard],  // Protection activée
  children: [...]
}
```

### 2. 🔁 HttpInterceptor (Injection Automatique du Token)

**Emplacement**: `src/app/interceptors/auth.interceptor.ts`

**Fonctionnalités**:
- Ajoute automatiquement le token JWT à toutes les requêtes HTTP
- Exclut les routes d'authentification (`/auth/login`, `/auth/register`, `/auth/refresh-token`)
- Gère les erreurs 401 (Unauthorized)

**Format du header ajouté**:
```
Authorization: Bearer <token>
```

### 3. ⏳ Auto-Refresh du Token

**Emplacement**: `src/app/interceptors/auth.interceptor.ts` (méthode `handle401Error`)

**Fonctionnalité**:
- Détecte automatiquement quand une requête échoue avec erreur 401
- Tente de rafraîchir le token via `/auth/refresh-token`
- Relance la requête initiale avec le nouveau token
- Évite les multiples refresh simultanés (système de queue)

**Workflow**:
1. Requête HTTP → Erreur 401
2. Interceptor appelle `/auth/refresh-token`
3. Sauvegarde le nouveau token dans `localStorage`
4. Relance la requête originale avec le nouveau token
5. Si le refresh échoue → Déconnexion et redirection vers `/login`

### 4. 📌 Redirection Automatique

**Cas de redirection**:

#### Token Expiré (AuthGuard)
```typescript
// URL actuelle conservée
this.router.navigate(['/login'], { 
  queryParams: { returnUrl: state.url } 
});
```

#### Token Invalide (Interceptor)
```typescript
// Déconnexion complète
private logout(): void {
  this.authService.clearCurrentUser();
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
```

## Configuration

### app.config.ts

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
```

### app.routes.ts

```typescript
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Routes publiques (non protégées)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Routes protégées
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],  // ← Protection
    children: [...]
  }
];
```

## Flux d'Authentification

### Login Réussi
1. Utilisateur se connecte
2. Backend renvoie `{ token, user }`
3. Frontend sauvegarde dans `localStorage`:
   - `token`: JWT
   - `user`: Informations utilisateur
4. Redirection vers la page demandée ou `/dashboard`

### Requête Authentifiée
1. User fait une action (ex: charger les missions)
2. **Interceptor** ajoute automatiquement `Authorization: Bearer <token>`
3. Backend vérifie le token
4. Réponse envoyée

### Token Expiré (Auto-Refresh)
1. Requête échoue avec 401
2. **Interceptor** détecte l'erreur
3. Appel à `/auth/refresh-token` avec l'ancien token
4. Backend renvoie un nouveau token
5. Sauvegarde du nouveau token
6. **Relance automatique** de la requête initiale
7. ✅ Requête réussie, utilisateur ne voit rien

### Token Invalide (Déconnexion)
1. Refresh token échoue
2. **Interceptor** appelle `logout()`
3. Nettoyage du `localStorage`
4. Redirection vers `/login`

## Vérification du Token

### Côté Frontend (AuthGuard)

```typescript
private isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expirationDate = payload.exp * 1000;
  return Date.now() >= expirationDate;
}
```

### Format JWT

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9  ← Header
.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNjE2MjM5MDIyfQ  ← Payload (avec exp)
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ← Signature
```

## Sécurité Backend Requise

Pour que ce système fonctionne correctement, le backend doit:

1. **Vérifier le token** sur toutes les routes protégées
2. **Renvoyer 401** si token expiré ou invalide
3. **Implémenter `/auth/refresh-token`** pour rafraîchir les tokens
4. **Définir une durée d'expiration** raisonnable (ex: 1h pour access token, 7j pour refresh token)

## Tests

### Tester AuthGuard
```typescript
// Sans token
localStorage.removeItem('token');
// Essayer d'accéder à /dashboard → Redirigé vers /login
```

### Tester Auto-Refresh
```typescript
// 1. Se connecter
// 2. Attendre que le token expire (ou le modifier manuellement)
// 3. Faire une action (charger des données)
// 4. Vérifier que le token est rafraîchi automatiquement
```

### Tester Token Invalide
```typescript
// Modifier manuellement le token dans localStorage
localStorage.setItem('token', 'invalid_token');
// Faire une action → Déconnecté automatiquement
```

## Bonnes Pratiques

1. ✅ **Ne jamais** stocker le token dans les cookies sans `httpOnly` flag
2. ✅ **Toujours** utiliser HTTPS en production
3. ✅ **Définir** une durée d'expiration courte pour les tokens
4. ✅ **Implémenter** un refresh token avec durée plus longue
5. ✅ **Logger** les tentatives de connexion suspectes
6. ✅ **Nettoyer** le localStorage à la déconnexion

## Dépannage

### "Token non ajouté aux requêtes"
- Vérifier que `AuthInterceptor` est bien dans `app.config.ts`
- Vérifier que la route n'est pas dans la liste d'exclusion

### "Boucle infinie de refresh"
- Vérifier que `/auth/refresh-token` est bien exclu de l'interceptor
- Vérifier le flag `isRefreshing` dans l'interceptor

### "Redirection non fonctionnelle"
- Vérifier que `AuthGuard` est bien appliqué sur les routes
- Vérifier les imports dans `app.routes.ts`
