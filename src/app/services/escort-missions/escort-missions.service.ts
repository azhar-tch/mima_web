import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EscortMission, EscortMissionRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class EscortMissionsService {
  private baseUrl = `${environment.apiUrl}/escort-missions`;

  constructor(private http: HttpClient) {}

  create(request: EscortMissionRequest): Observable<ApiResponse<EscortMission>> {
    return this.http.post<ApiResponse<EscortMission>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: EscortMissionRequest): Observable<ApiResponse<EscortMission>> {
    return this.http.put<ApiResponse<EscortMission>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<EscortMission>> {
    return this.http.get<ApiResponse<EscortMission>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<EscortMission[]>> {
    return this.http.get<ApiResponse<EscortMission[]>>(`${this.baseUrl}/list`);
  }

  listByShip(commercialShipTrackingId: string): Observable<ApiResponse<EscortMission[]>> {
    return this.http.get<ApiResponse<EscortMission[]>>(`${this.baseUrl}/list/ship/${commercialShipTrackingId}`);
  }

  listByNavalVessel(navalVesselTrackingId: string): Observable<ApiResponse<EscortMission[]>> {
    return this.http.get<ApiResponse<EscortMission[]>>(`${this.baseUrl}/list/vessel/${navalVesselTrackingId}`);
  }

  listByCommander(commanderTrackingId: string): Observable<ApiResponse<EscortMission[]>> {
    return this.http.get<ApiResponse<EscortMission[]>>(`${this.baseUrl}/list/commander/${commanderTrackingId}`);
  }

  listByStatus(status: string): Observable<ApiResponse<EscortMission[]>> {
    const params = new HttpParams().set('status', status);
    return this.http.get<ApiResponse<EscortMission[]>>(`${this.baseUrl}/list/status`, { params });
  }

  searchByMissionNumber(missionNumber: string): Observable<ApiResponse<EscortMission>> {
    const params = new HttpParams().set('missionNumber', missionNumber);
    return this.http.get<ApiResponse<EscortMission>>(`${this.baseUrl}/search/number`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
