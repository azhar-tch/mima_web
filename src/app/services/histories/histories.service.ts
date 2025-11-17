import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/api-response';
import { HistoriesRequest, HistoriesResponse } from '../../models/Histories';

@Injectable({
  providedIn: 'root'
})
export class HistoriesService {
  private baseUrl = `${environment.apiUrl}/histories`;

  constructor(private http: HttpClient) {}

  createHistory(request: HistoriesRequest): Observable<ApiResponse<HistoriesResponse>> {
    return this.http.post<ApiResponse<HistoriesResponse>>(`${this.baseUrl}/create`, request);
  }

  getHistory(trackingId: string): Observable<ApiResponse<HistoriesResponse>> {
    return this.http.get<ApiResponse<HistoriesResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  listByAgent(agentTrackingId: string): Observable<ApiResponse<HistoriesResponse[]>> {
    return this.http.get<ApiResponse<HistoriesResponse[]>>(`${this.baseUrl}/agent/${agentTrackingId}`);
  }

  listByEntity(entityTrackingId: string): Observable<ApiResponse<HistoriesResponse[]>> {
    return this.http.get<ApiResponse<HistoriesResponse[]>>(`${this.baseUrl}/entity/${entityTrackingId}`);
  }

  listHistories(): Observable<ApiResponse<HistoriesResponse[]>> {
    return this.http.get<ApiResponse<HistoriesResponse[]>>(`${this.baseUrl}/list`);
  }
}
