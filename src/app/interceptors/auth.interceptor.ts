import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ne pas ajouter le token pour les requêtes de login, register, refresh-token
    const isAuthRequest = req.url.includes('/auth/login') || 
                         req.url.includes('/auth/register') ||
                         req.url.includes('/auth/refresh-token');

    if (isAuthRequest) {
      return next.handle(req);
    }

    // Ajouter le token à toutes les autres requêtes
    const token = this.authService.getToken();
    
    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expiré ou invalide
          return this.handle401Error(req, next);
        }
        if (error.status === 403) {
          // Accès refusé - peut indiquer un token invalide
          console.warn('Accès refusé (403), redirection vers login');
          this.logout();
          return throwError(() => error);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.authService.getToken();

      if (token) {
        return this.authService.refreshToken(token).pipe(
          switchMap((response: any) => {
            this.isRefreshing = false;

            // Sauvegarder le nouveau token
            const newToken = response.token || response.data?.token;
            if (newToken) {
              localStorage.setItem('token', newToken);
              this.refreshTokenSubject.next(newToken);

              // Relancer la requête avec le nouveau token
              return next.handle(this.addToken(request, newToken));
            }

            // Pas de nouveau token, rediriger vers login
            this.logout();
            return throwError(() => new Error('Token refresh failed'));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.logout();
            return throwError(() => err);
          })
        );
      } else {
        // Pas de token du tout, rediriger vers login
        this.isRefreshing = false;
        this.logout();
        return throwError(() => new Error('No token available'));
      }
    }

    // Si un refresh est déjà en cours, attendre qu'il se termine
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => {
        return next.handle(this.addToken(request, token!));
      })
    );
  }

  private logout(): void {
    this.authService.clearCurrentUser();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
