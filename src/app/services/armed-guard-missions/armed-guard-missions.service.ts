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

  getByMissionNumber(missionNumber: string): Observable<ApiResponse<ArmedGuardMission>> {
    return this.http.get<ApiResponse<ArmedGuardMission>>(`${this.baseUrl}/get/mission-number/${missionNumber}`);
  }

  listByStatus(status: string): Observable<ApiResponse<ArmedGuardMission[]>> {
    return this.http.get<ApiResponse<ArmedGuardMission[]>>(`${this.baseUrl}/list/status/${status}`);
  }

  listByPeriod(startDate: string, endDate: string): Observable<ApiResponse<ArmedGuardMission[]>> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<ApiResponse<ArmedGuardMission[]>>(`${this.baseUrl}/list/period`, { params });
  }

  listByCommercialShip(shipTrackingId: string): Observable<ApiResponse<ArmedGuardMission[]>> {
    return this.http.get<ApiResponse<ArmedGuardMission[]>>(`${this.baseUrl}/list/commercial-ship/${shipTrackingId}`);
  }

  listBySecurityAgency(agencyTrackingId: string): Observable<ApiResponse<ArmedGuardMission[]>> {
    return this.http.get<ApiResponse<ArmedGuardMission[]>>(`${this.baseUrl}/list/security-agency/${agencyTrackingId}`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
