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

  getByMissionNumber(missionNumber: string): Observable<ApiResponse<EscortMission>> {
    return this.http.get<ApiResponse<EscortMission>>(`${this.baseUrl}/get/mission-number/${missionNumber}`);
  }

  listByStatus(status: string): Observable<ApiResponse<EscortMission[]>> {
    return this.http.get<ApiResponse<EscortMission[]>>(`${this.baseUrl}/list/status/${status}`);
  }

  listByPeriod(startDate: string, endDate: string): Observable<ApiResponse<EscortMission[]>> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<ApiResponse<EscortMission[]>>(`${this.baseUrl}/list/period`, { params });
  }

  listByCommercialShip(shipTrackingId: string): Observable<ApiResponse<EscortMission[]>> {
    return this.http.get<ApiResponse<EscortMission[]>>(`${this.baseUrl}/list/commercial-ship/${shipTrackingId}`);
  }

  listByNavalVessel(vesselTrackingId: string): Observable<ApiResponse<EscortMission[]>> {
    return this.http.get<ApiResponse<EscortMission[]>>(`${this.baseUrl}/list/naval-vessel/${vesselTrackingId}`);
  }

  listByCommander(commanderTrackingId: string): Observable<ApiResponse<EscortMission[]>> {
    return this.http.get<ApiResponse<EscortMission[]>>(`${this.baseUrl}/list/commander/${commanderTrackingId}`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
