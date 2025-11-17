import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth/auth.service';

/**
 * Vérifie l'authentification au démarrage de l'application
 */
function checkAuthOnStartup(authService: AuthService, router: Router) {
  return () => {
    const token = authService.getToken();
    const currentPath = window.location.pathname;

    // Ne pas rediriger si déjà sur login ou register
    if (currentPath === '/login' || currentPath === '/register') {
      return;
    }

    // Si pas de token ou token expiré, rediriger vers login
    if (!token) {
      console.warn('Pas de token au démarrage, redirection vers login');
      authService.clearCurrentUser();
      router.navigate(['/login']);
      return;
    }

    // Vérifier si le token est expiré
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = payload.exp * 1000;

      if (Date.now() >= expirationDate) {
        console.warn('Token expiré au démarrage, redirection vers login');
        authService.clearCurrentUser();
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du token au démarrage', error);
      authService.clearCurrentUser();
      localStorage.removeItem('token');
      router.navigate(['/login']);
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: checkAuthOnStartup,
      deps: [AuthService, Router],
      multi: true
    }
  ]
};
