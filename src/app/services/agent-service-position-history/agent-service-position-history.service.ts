import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgentServicePositionHistory, AgentServicePositionHistoryRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AgentServicePositionHistoryService {
  private baseUrl = `${environment.apiUrl}/agent-service-position-history`;

  constructor(private http: HttpClient) {}

  create(request: AgentServicePositionHistoryRequest): Observable<ApiResponse<AgentServicePositionHistory>> {
    return this.http.post<ApiResponse<AgentServicePositionHistory>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: AgentServicePositionHistoryRequest): Observable<ApiResponse<AgentServicePositionHistory>> {
    return this.http.put<ApiResponse<AgentServicePositionHistory>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<AgentServicePositionHistory>> {
    return this.http.get<ApiResponse<AgentServicePositionHistory>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<AgentServicePositionHistory[]>> {
    return this.http.get<ApiResponse<AgentServicePositionHistory[]>>(`${this.baseUrl}/list`);
  }

  listByAgent(agentTrackingId: string): Observable<ApiResponse<AgentServicePositionHistory[]>> {
    return this.http.get<ApiResponse<AgentServicePositionHistory[]>>(`${this.baseUrl}/agent/${agentTrackingId}`);
  }

  listByPosition(servicePositionTrackingId: string): Observable<ApiResponse<AgentServicePositionHistory[]>> {
    return this.http.get<ApiResponse<AgentServicePositionHistory[]>>(`${this.baseUrl}/service-position/${servicePositionTrackingId}`);
  }

  listByStartDateRange(startDate: string, endDate: string): Observable<ApiResponse<AgentServicePositionHistory[]>> {
    return this.http.get<ApiResponse<AgentServicePositionHistory[]>>(`${this.baseUrl}/start-date-range/${startDate}/${endDate}`);
  }

  getCurrentPositionByAgent(agentTrackingId: string): Observable<ApiResponse<AgentServicePositionHistory>> {
    return this.http.get<ApiResponse<AgentServicePositionHistory>>(`${this.baseUrl}/agent/${agentTrackingId}/current`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
