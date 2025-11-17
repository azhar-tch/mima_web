import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken();
    
    if (token) {
      // Vérifier si le token est expiré
      if (this.isTokenExpired(token)) {
        console.warn('Token expiré, redirection vers login');
        this.authService.clearCurrentUser();
        localStorage.removeItem('token');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      return true;
    }

    // Pas de token, rediriger vers login
    console.warn('Pas de token, redirection vers login');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expirationDate;
    } catch (error) {
      console.error('Erreur lors de la vérification du token', error);
      return true; // Considérer comme expiré si erreur
    }
  }
}
