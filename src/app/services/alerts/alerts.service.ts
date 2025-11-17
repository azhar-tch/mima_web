import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AlertsRequest, AlertsResponse } from '../../models/Alerts';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private baseUrl = `${environment.apiUrl}/alerts`;

  constructor(private http: HttpClient) {}

  // 🔹 CRUD Alertes
  createAlert(request: AlertsRequest): Observable<ApiResponse<AlertsResponse>> {
    return this.http.post<ApiResponse<AlertsResponse>>(`${this.baseUrl}/create`, request);
  }

  updateAlert(trackingId: string, request: AlertsRequest): Observable<ApiResponse<AlertsResponse>> {
    return this.http.put<ApiResponse<AlertsResponse>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  getAlert(trackingId: string): Observable<ApiResponse<AlertsResponse>> {
    return this.http.get<ApiResponse<AlertsResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  listByStatus(status: string): Observable<ApiResponse<AlertsResponse[]>> {
    return this.http.get<ApiResponse<AlertsResponse[]>>(`${this.baseUrl}/status/${status}`);
  }

  listByAgent(agentTrackingId: string): Observable<ApiResponse<AlertsResponse[]>> {
    return this.http.get<ApiResponse<AlertsResponse[]>>(`${this.baseUrl}/agent/${agentTrackingId}`);
  }

  listAlerts(): Observable<ApiResponse<AlertsResponse[]>> {
    return this.http.get<ApiResponse<AlertsResponse[]>>(`${this.baseUrl}/list`);
  }

  deleteAlert(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
