import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ArmedGuardMission, ArmedGuardMissionRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ArmedGuardMissionsService {
  private baseUrl = `${environment.apiUrl}/armed-guard-missions`;

  constructor(private http: HttpClient) {}

  create(request: ArmedGuardMissionRequest): Observable<ApiResponse<ArmedGuardMission>> {
    return this.http.post<ApiResponse<ArmedGuardMission>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: ArmedGuardMissionRequest): Observable<ApiResponse<ArmedGuardMission>> {
    return this.http.put<ApiResponse<ArmedGuardMission>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<ArmedGuardMission>> {
    return this.http.get<ApiResponse<ArmedGuardMission>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<ArmedGuardMission[]>> {
    return this.http.get<ApiResponse<ArmedGuardMission[]>>(`${this.baseUrl}/list`);
  }

  listByShip(commercialShipTrackingId: string): Observable<ApiResponse<ArmedGuardMission[]>> {
    return this.http.get<ApiResponse<ArmedGuardMission[]>>(`${this.baseUrl}/list/ship/${commercialShipTrackingId}`);
  }

  listByAgency(securityAgencyTrackingId: string): Observable<ApiResponse<ArmedGuardMission[]>> {
    return this.http.get<ApiResponse<ArmedGuardMission[]>>(`${this.baseUrl}/list/agency/${securityAgencyTrackingId}`);
  }

  listByStatus(status: string): Observable<ApiResponse<ArmedGuardMission[]>> {
    const params = new HttpParams().set('status', status);
    return this.http.get<ApiResponse<ArmedGuardMission[]>>(`${this.baseUrl}/list/status`, { params });
  }

  searchByMissionNumber(missionNumber: string): Observable<ApiResponse<ArmedGuardMission>> {
    const params = new HttpParams().set('missionNumber', missionNumber);
    return this.http.get<ApiResponse<ArmedGuardMission>>(`${this.baseUrl}/search/number`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
