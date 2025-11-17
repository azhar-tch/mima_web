import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgentsRequest, AgentsResponse } from '../../models/Agents';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  private baseUrl = `${environment.apiUrl}/agents`;

  constructor(private http: HttpClient) {}

  // 🔹 Création d'un agent
  createAgent(request: AgentsRequest): Observable<ApiResponse<AgentsResponse>> {
    return this.http.post<ApiResponse<AgentsResponse>>(`${this.baseUrl}/create`, request);
  }

  // 🔹 Mise à jour d'un agent
  updateAgent(trackingId: string, request: AgentsRequest): Observable<ApiResponse<AgentsResponse>> {
    return this.http.put<ApiResponse<AgentsResponse>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  // 🔹 Récupérer un agent par son trackingId
  getAgent(trackingId: string): Observable<ApiResponse<AgentsResponse>> {
    return this.http.get<ApiResponse<AgentsResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  // 🔹 Liste des agents d'une unité
  listAgentsByUnit(unitTrackingId: string): Observable<ApiResponse<AgentsResponse[]>> {
    return this.http.get<ApiResponse<AgentsResponse[]>>(`${this.baseUrl}/list/unit/${unitTrackingId}`);
  }

  // 🔹 Liste complète des agents
  listAgents(): Observable<ApiResponse<AgentsResponse[]>> {
    return this.http.get<ApiResponse<AgentsResponse[]>>(`${this.baseUrl}/list`);
  }

  // 🔹 Suppression d'un agent
  deleteAgent(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
