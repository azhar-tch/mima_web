import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AbsencesRequest, AbsencesResponse } from '../../models/Absences';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {
  private baseUrl = `${environment.apiUrl}/absences`;

  constructor(private http: HttpClient) {}

  // 🔹 Création d'une absence
  createAbsence(request: AbsencesRequest): Observable<ApiResponse<AbsencesResponse>> {
    return this.http.post<ApiResponse<AbsencesResponse>>(`${this.baseUrl}/create`, request);
  }

  // 🔹 Mise à jour d'une absence
  updateAbsence(trackingId: string, request: AbsencesRequest): Observable<ApiResponse<AbsencesResponse>> {
    return this.http.put<ApiResponse<AbsencesResponse>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  // 🔹 Récupérer une absence par son trackingId
  getAbsence(trackingId: string): Observable<ApiResponse<AbsencesResponse>> {
    return this.http.get<ApiResponse<AbsencesResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  // 🔹 Liste des absences d'un agent
  listAbsencesByAgent(agentTrackingId: string): Observable<ApiResponse<AbsencesResponse[]>> {
    return this.http.get<ApiResponse<AbsencesResponse[]>>(`${this.baseUrl}/list/agent/${agentTrackingId}`);
  }

  // 🔹 Liste des absences par statut
  listAbsencesByStatus(status: string): Observable<ApiResponse<AbsencesResponse[]>> {
    return this.http.get<ApiResponse<AbsencesResponse[]>>(`${this.baseUrl}/list/status/${status}`);
  }

  // 🔹 Liste complète des absences
  listAbsences(): Observable<ApiResponse<AbsencesResponse[]>> {
    return this.http.get<ApiResponse<AbsencesResponse[]>>(`${this.baseUrl}/list`);
  }

  // 🔹 Suppression d'une absence
  deleteAbsence(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }

  // 🔹 Mise à jour du statut d'une absence
  updateAbsenceStatus(trackingId: string, status: string, validatedByTrackingId?: string): Observable<ApiResponse<AbsencesResponse>> {
    let url = `${this.baseUrl}/update/status/${trackingId}?status=${status}`;
    if (validatedByTrackingId) {
      url += `&validatedByTrackingId=${validatedByTrackingId}`;
    }
    return this.http.patch<ApiResponse<AbsencesResponse>>(url, {});
  }
}
