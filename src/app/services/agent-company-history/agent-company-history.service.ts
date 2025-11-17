import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgentCompanyHistory, AgentCompanyHistoryRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AgentCompanyHistoryService {
  private baseUrl = `${environment.apiUrl}/agent-company-history`;

  constructor(private http: HttpClient) {}

  create(request: AgentCompanyHistoryRequest): Observable<ApiResponse<AgentCompanyHistory>> {
    return this.http.post<ApiResponse<AgentCompanyHistory>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: AgentCompanyHistoryRequest): Observable<ApiResponse<AgentCompanyHistory>> {
    return this.http.put<ApiResponse<AgentCompanyHistory>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<AgentCompanyHistory>> {
    return this.http.get<ApiResponse<AgentCompanyHistory>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<AgentCompanyHistory[]>> {
    return this.http.get<ApiResponse<AgentCompanyHistory[]>>(`${this.baseUrl}/list`);
  }

  listByAgent(agentTrackingId: string): Observable<ApiResponse<AgentCompanyHistory[]>> {
    return this.http.get<ApiResponse<AgentCompanyHistory[]>>(`${this.baseUrl}/list/agent/${agentTrackingId}`);
  }

  listByCompany(companyTrackingId: string): Observable<ApiResponse<AgentCompanyHistory[]>> {
    return this.http.get<ApiResponse<AgentCompanyHistory[]>>(`${this.baseUrl}/list/company/${companyTrackingId}`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
