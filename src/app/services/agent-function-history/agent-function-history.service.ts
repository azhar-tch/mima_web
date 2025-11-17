import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgentFunctionHistory, AgentFunctionHistoryRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AgentFunctionHistoryService {
  private baseUrl = `${environment.apiUrl}/agent-function-history`;

  constructor(private http: HttpClient) {}

  create(request: AgentFunctionHistoryRequest): Observable<ApiResponse<AgentFunctionHistory>> {
    return this.http.post<ApiResponse<AgentFunctionHistory>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: AgentFunctionHistoryRequest): Observable<ApiResponse<AgentFunctionHistory>> {
    return this.http.put<ApiResponse<AgentFunctionHistory>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<AgentFunctionHistory>> {
    return this.http.get<ApiResponse<AgentFunctionHistory>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<AgentFunctionHistory[]>> {
    return this.http.get<ApiResponse<AgentFunctionHistory[]>>(`${this.baseUrl}/list`);
  }

  listByAgent(agentTrackingId: string): Observable<ApiResponse<AgentFunctionHistory[]>> {
    return this.http.get<ApiResponse<AgentFunctionHistory[]>>(`${this.baseUrl}/agent/${agentTrackingId}`);
  }

  listByFunction(functionTrackingId: string): Observable<ApiResponse<AgentFunctionHistory[]>> {
    return this.http.get<ApiResponse<AgentFunctionHistory[]>>(`${this.baseUrl}/function/${functionTrackingId}`);
  }

  listByStartDateRange(startDate: string, endDate: string): Observable<ApiResponse<AgentFunctionHistory[]>> {
    return this.http.get<ApiResponse<AgentFunctionHistory[]>>(`${this.baseUrl}/start-date-range/${startDate}/${endDate}`);
  }

  getCurrentFunctionByAgent(agentTrackingId: string): Observable<ApiResponse<AgentFunctionHistory>> {
    return this.http.get<ApiResponse<AgentFunctionHistory>>(`${this.baseUrl}/agent/${agentTrackingId}/current`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
