import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgentAwardHistory, AgentAwardHistoryRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AgentAwardHistoryService {
  private baseUrl = `${environment.apiUrl}/agent-award-history`;

  constructor(private http: HttpClient) {}

  create(request: AgentAwardHistoryRequest): Observable<ApiResponse<AgentAwardHistory>> {
    return this.http.post<ApiResponse<AgentAwardHistory>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: AgentAwardHistoryRequest): Observable<ApiResponse<AgentAwardHistory>> {
    return this.http.put<ApiResponse<AgentAwardHistory>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<AgentAwardHistory>> {
    return this.http.get<ApiResponse<AgentAwardHistory>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<AgentAwardHistory[]>> {
    return this.http.get<ApiResponse<AgentAwardHistory[]>>(`${this.baseUrl}/list`);
  }

  listByAgent(agentTrackingId: string): Observable<ApiResponse<AgentAwardHistory[]>> {
    return this.http.get<ApiResponse<AgentAwardHistory[]>>(`${this.baseUrl}/list/agent/${agentTrackingId}`);
  }

  listByAward(awardTrackingId: string): Observable<ApiResponse<AgentAwardHistory[]>> {
    return this.http.get<ApiResponse<AgentAwardHistory[]>>(`${this.baseUrl}/list/award/${awardTrackingId}`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
