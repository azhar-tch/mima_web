import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AgentTrainingHistory, AgentTrainingHistoryRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AgentTrainingHistoryService {
  private baseUrl = `${environment.apiUrl}/agent-training-history`;

  constructor(private http: HttpClient) {}

  create(request: AgentTrainingHistoryRequest): Observable<ApiResponse<AgentTrainingHistory>> {
    return this.http.post<ApiResponse<AgentTrainingHistory>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: AgentTrainingHistoryRequest): Observable<ApiResponse<AgentTrainingHistory>> {
    return this.http.put<ApiResponse<AgentTrainingHistory>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<AgentTrainingHistory>> {
    return this.http.get<ApiResponse<AgentTrainingHistory>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<AgentTrainingHistory[]>> {
    return this.http.get<ApiResponse<AgentTrainingHistory[]>>(`${this.baseUrl}/list`);
  }

  listByAgent(agentTrackingId: string): Observable<ApiResponse<AgentTrainingHistory[]>> {
    return this.http.get<ApiResponse<AgentTrainingHistory[]>>(`${this.baseUrl}/agent/${agentTrackingId}`);
  }

  listByTraining(trainingTrackingId: string): Observable<ApiResponse<AgentTrainingHistory[]>> {
    return this.http.get<ApiResponse<AgentTrainingHistory[]>>(`${this.baseUrl}/training/${trainingTrackingId}`);
  }

  listByStartDateRange(startDate: string, endDate: string): Observable<ApiResponse<AgentTrainingHistory[]>> {
    return this.http.get<ApiResponse<AgentTrainingHistory[]>>(`${this.baseUrl}/start-date-range/${startDate}/${endDate}`);
  }

  getOngoingTrainingsByAgent(agentTrackingId: string): Observable<ApiResponse<AgentTrainingHistory[]>> {
    return this.http.get<ApiResponse<AgentTrainingHistory[]>>(`${this.baseUrl}/agent/${agentTrackingId}/ongoing`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
