import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgentGradeHistory, AgentGradeHistoryRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AgentGradeHistoryService {
  private baseUrl = `${environment.apiUrl}/agent-grade-history`;

  constructor(private http: HttpClient) {}

  create(request: AgentGradeHistoryRequest): Observable<ApiResponse<AgentGradeHistory>> {
    return this.http.post<ApiResponse<AgentGradeHistory>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: AgentGradeHistoryRequest): Observable<ApiResponse<AgentGradeHistory>> {
    return this.http.put<ApiResponse<AgentGradeHistory>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<AgentGradeHistory>> {
    return this.http.get<ApiResponse<AgentGradeHistory>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<AgentGradeHistory[]>> {
    return this.http.get<ApiResponse<AgentGradeHistory[]>>(`${this.baseUrl}/list`);
  }

  listByAgent(agentTrackingId: string): Observable<ApiResponse<AgentGradeHistory[]>> {
    return this.http.get<ApiResponse<AgentGradeHistory[]>>(`${this.baseUrl}/agent/${agentTrackingId}`);
  }

  listByGrade(gradeTrackingId: string): Observable<ApiResponse<AgentGradeHistory[]>> {
    return this.http.get<ApiResponse<AgentGradeHistory[]>>(`${this.baseUrl}/grade/${gradeTrackingId}`);
  }

  listByPromotionDateRange(startDate: string, endDate: string): Observable<ApiResponse<AgentGradeHistory[]>> {
    return this.http.get<ApiResponse<AgentGradeHistory[]>>(`${this.baseUrl}/promotion-date-range/${startDate}/${endDate}`);
  }

  getLatestGradeByAgent(agentTrackingId: string): Observable<ApiResponse<AgentGradeHistory>> {
    return this.http.get<ApiResponse<AgentGradeHistory>>(`${this.baseUrl}/agent/${agentTrackingId}/latest`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
