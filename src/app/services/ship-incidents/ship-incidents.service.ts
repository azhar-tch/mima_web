import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShipIncident, ShipIncidentRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ShipIncidentsService {
  private baseUrl = `${environment.apiUrl}/ship-incidents`;

  constructor(private http: HttpClient) {}

  create(request: ShipIncidentRequest): Observable<ApiResponse<ShipIncident>> {
    return this.http.post<ApiResponse<ShipIncident>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: ShipIncidentRequest): Observable<ApiResponse<ShipIncident>> {
    return this.http.put<ApiResponse<ShipIncident>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<ShipIncident>> {
    return this.http.get<ApiResponse<ShipIncident>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<ShipIncident[]>> {
    return this.http.get<ApiResponse<ShipIncident[]>>(`${this.baseUrl}/list`);
  }

  listByShip(commercialShipTrackingId: string): Observable<ApiResponse<ShipIncident[]>> {
    return this.http.get<ApiResponse<ShipIncident[]>>(`${this.baseUrl}/list/commercial-ship/${commercialShipTrackingId}`);
  }

  listOngoing(): Observable<ApiResponse<ShipIncident[]>> {
    return this.http.get<ApiResponse<ShipIncident[]>>(`${this.baseUrl}/list/ongoing`);
  }

  listByStatus(status: string): Observable<ApiResponse<ShipIncident[]>> {
    return this.http.get<ApiResponse<ShipIncident[]>>(`${this.baseUrl}/list/status/${status}`);
  }

  listByPeriod(startDate: string, endDate: string): Observable<ApiResponse<ShipIncident[]>> {
    return this.http.get<ApiResponse<ShipIncident[]>>(`${this.baseUrl}/list/period/${startDate}/${endDate}`);
  }

  listByEventType(eventType: string): Observable<ApiResponse<ShipIncident[]>> {
    return this.http.get<ApiResponse<ShipIncident[]>>(`${this.baseUrl}/list/event-type/${eventType}`);
  }

  listBySeverity(severity: string): Observable<ApiResponse<ShipIncident[]>> {
    return this.http.get<ApiResponse<ShipIncident[]>>(`${this.baseUrl}/list/severity/${severity}`);
  }

  listWithPollution(): Observable<ApiResponse<ShipIncident[]>> {
    return this.http.get<ApiResponse<ShipIncident[]>>(`${this.baseUrl}/list/with-pollution`);
  }

  listByMaritimeZone(maritimeZone: string): Observable<ApiResponse<ShipIncident[]>> {
    return this.http.get<ApiResponse<ShipIncident[]>>(`${this.baseUrl}/list/maritime-zone/${maritimeZone}`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
