import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DutiesRequest, DutiesResponse } from '../../models/Duties';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class DutiesService {
  private baseUrl = `${environment.apiUrl}/duties`;

  constructor(private http: HttpClient) {}

  createDuty(request: DutiesRequest): Observable<ApiResponse<DutiesResponse>> {
    return this.http.post<ApiResponse<DutiesResponse>>(`${this.baseUrl}/create`, request);
  }

  updateDuty(trackingId: string, request: DutiesRequest): Observable<ApiResponse<DutiesResponse>> {
    return this.http.put<ApiResponse<DutiesResponse>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  getDuty(trackingId: string): Observable<ApiResponse<DutiesResponse>> {
    return this.http.get<ApiResponse<DutiesResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  listByAgent(agentTrackingId: string): Observable<ApiResponse<DutiesResponse[]>> {
    return this.http.get<ApiResponse<DutiesResponse[]>>(`${this.baseUrl}/agent/${agentTrackingId}`);
  }

  listByStatus(status: string): Observable<ApiResponse<DutiesResponse[]>> {
    return this.http.get<ApiResponse<DutiesResponse[]>>(`${this.baseUrl}/status/${status}`);
  }

  listDuties(): Observable<ApiResponse<DutiesResponse[]>> {
    return this.http.get<ApiResponse<DutiesResponse[]>>(`${this.baseUrl}/list`);
  }

  deleteDuty(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
