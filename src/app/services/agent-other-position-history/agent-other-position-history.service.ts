import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgentOtherPositionHistory, AgentOtherPositionHistoryRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AgentOtherPositionHistoryService {
  private baseUrl = `${environment.apiUrl}/agent-other-position-history`;

  constructor(private http: HttpClient) {}

  create(request: AgentOtherPositionHistoryRequest): Observable<ApiResponse<AgentOtherPositionHistory>> {
    return this.http.post<ApiResponse<AgentOtherPositionHistory>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: AgentOtherPositionHistoryRequest): Observable<ApiResponse<AgentOtherPositionHistory>> {
    return this.http.put<ApiResponse<AgentOtherPositionHistory>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<AgentOtherPositionHistory>> {
    return this.http.get<ApiResponse<AgentOtherPositionHistory>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<AgentOtherPositionHistory[]>> {
    return this.http.get<ApiResponse<AgentOtherPositionHistory[]>>(`${this.baseUrl}/list`);
  }

  listByAgent(agentTrackingId: string): Observable<ApiResponse<AgentOtherPositionHistory[]>> {
    return this.http.get<ApiResponse<AgentOtherPositionHistory[]>>(`${this.baseUrl}/agent/${agentTrackingId}`);
  }

  listByPosition(otherPositionTrackingId: string): Observable<ApiResponse<AgentOtherPositionHistory[]>> {
    return this.http.get<ApiResponse<AgentOtherPositionHistory[]>>(`${this.baseUrl}/other-position/${otherPositionTrackingId}`);
  }

  listByStartDateRange(startDate: string, endDate: string): Observable<ApiResponse<AgentOtherPositionHistory[]>> {
    return this.http.get<ApiResponse<AgentOtherPositionHistory[]>>(`${this.baseUrl}/start-date-range/${startDate}/${endDate}`);
  }

  getOngoingPositionsByAgent(agentTrackingId: string): Observable<ApiResponse<AgentOtherPositionHistory[]>> {
    return this.http.get<ApiResponse<AgentOtherPositionHistory[]>>(`${this.baseUrl}/agent/${agentTrackingId}/ongoing`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
