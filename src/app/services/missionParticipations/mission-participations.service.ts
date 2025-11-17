import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/api-response';
import { 
  MissionParticipationsRequest, 
  MissionParticipationsResponse, 
  UpdateHoursRequest 
} from '../../models/MissionParticipations';

@Injectable({
  providedIn: 'root'
})
export class MissionParticipationsService {
  private baseUrl = `${environment.apiUrl}/mission-participations`;

  constructor(private http: HttpClient) {}

  // 🔹 CRUD Participations
  createParticipation(request: MissionParticipationsRequest): Observable<ApiResponse<MissionParticipationsResponse>> {
    return this.http.post<ApiResponse<MissionParticipationsResponse>>(`${this.baseUrl}/create`, request);
  }

  updateParticipation(trackingId: string, request: MissionParticipationsRequest): Observable<ApiResponse<MissionParticipationsResponse>> {
    return this.http.put<ApiResponse<MissionParticipationsResponse>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  getParticipation(trackingId: string): Observable<ApiResponse<MissionParticipationsResponse>> {
    return this.http.get<ApiResponse<MissionParticipationsResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  listParticipations(): Observable<ApiResponse<MissionParticipationsResponse[]>> {
    return this.http.get<ApiResponse<MissionParticipationsResponse[]>>(`${this.baseUrl}/list`);
  }

  deleteParticipation(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }

  // 🔹 Filtres
  listByMission(missionTrackingId: string): Observable<ApiResponse<MissionParticipationsResponse[]>> {
    return this.http.get<ApiResponse<MissionParticipationsResponse[]>>(`${this.baseUrl}/mission/${missionTrackingId}`);
  }

  listByAgent(agentTrackingId: string): Observable<ApiResponse<MissionParticipationsResponse[]>> {
    return this.http.get<ApiResponse<MissionParticipationsResponse[]>>(`${this.baseUrl}/agent/${agentTrackingId}`);
  }

  // 🔹 Mettre à jour les heures effectuées
  updateHours(trackingId: string, request: UpdateHoursRequest): Observable<ApiResponse<MissionParticipationsResponse>> {
    return this.http.put<ApiResponse<MissionParticipationsResponse>>(`${this.baseUrl}/update/${trackingId}`, request);
  }
}
