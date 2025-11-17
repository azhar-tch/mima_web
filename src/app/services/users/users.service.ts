import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsersRequest, UsersResponse, LoginCredentials, LoginResponse, RegisterRequest } from '../../models/Users';
import { ApiResponse } from '../../models/api-response';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // 🔹 CRUD UTILISATEURS
  createUser(request: UsersRequest): Observable<ApiResponse<UsersResponse>> {
    return this.http.post<ApiResponse<UsersResponse>>(`${this.baseUrl}/create`, request);
  }

  updateUser(trackingId: string, request: UsersRequest): Observable<ApiResponse<UsersResponse>> {
    return this.http.put<ApiResponse<UsersResponse>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  getUser(trackingId: string): Observable<ApiResponse<UsersResponse>> {
    return this.http.get<ApiResponse<UsersResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  getUserByEmail(email: string): Observable<ApiResponse<UsersResponse>> {
    return this.http.get<ApiResponse<UsersResponse>>(`${this.baseUrl}/get/email/${email}`);
  }

  listUsers(): Observable<ApiResponse<UsersResponse[]>> {
    return this.http.get<ApiResponse<UsersResponse[]>>(`${this.baseUrl}/list`);
  }

  deleteUser(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
  

  // 🔹 AUTH (si ton backend les gère plus tard)
  login(credentials: LoginCredentials): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, credentials);
  }

  register(request: RegisterRequest): Observable<ApiResponse<UsersResponse>> {
    return this.http.post<ApiResponse<UsersResponse>>(`${this.baseUrl}/register`, request);
  }
}
