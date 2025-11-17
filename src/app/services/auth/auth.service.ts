import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginCredentials, LoginResponse, RegisterRequest, UsersResponse } from '../../models/Users';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  // 🔹 Inscription
  register(user: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  // 🔹 Connexion
 login(credentials: LoginCredentials): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
}

  // 🔹 Déconnexion
 logout(token: string) {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.post(`${this.baseUrl}/logout`, null, { headers });
}


    // 🔹 Sauvegarder l'utilisateur et le token après login
  setSession(data: LoginResponse) {
  localStorage.setItem('token', data.token);
  this.setCurrentUser(data.user);
}

   // 🔹 Récupérer le token pour les requêtes authentifiées
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 Rafraîchissement du token
  refreshToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}/refresh-token`, null, { headers });
  }

    // 🔹 Récupérer l'utilisateur courant
  getCurrentUser(): UsersResponse | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  // 🔹 Pour sauvegarder l'utilisateur après login
  setCurrentUser(user: UsersResponse) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // 🔹 Supprimer l'utilisateur lors du logout
  clearCurrentUser() {
    localStorage.removeItem('user');
  }
}
