import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MissionsRequest, MissionsResponse } from '../../models/Missions';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
  private baseUrl = `${environment.apiUrl}/missions`;

  constructor(private http: HttpClient) {}

  // ✅ Create mission
  createMission(request: MissionsRequest): Observable<ApiResponse<MissionsResponse>> {
    return this.http.post<ApiResponse<MissionsResponse>>(`${this.baseUrl}/create`, request);
  }

  // ✅ Update mission
  updateMission(trackingId: string, request: MissionsRequest): Observable<ApiResponse<MissionsResponse>> {
    return this.http.put<ApiResponse<MissionsResponse>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  // ✅ Get one mission
  getMission(trackingId: string): Observable<ApiResponse<MissionsResponse>> {
    return this.http.get<ApiResponse<MissionsResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  // ✅ List all missions
  listMissions(): Observable<ApiResponse<MissionsResponse[]>> {
    return this.http.get<ApiResponse<MissionsResponse[]>>(`${this.baseUrl}/list`);
  }

  // ✅ List missions by status
  listMissionsByStatus(status: string): Observable<ApiResponse<MissionsResponse[]>> {
    return this.http.get<ApiResponse<MissionsResponse[]>>(`${this.baseUrl}/list/status/${status}`);
  }

  // ✅ Delete mission
  deleteMission(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
