import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ManagementRulesRequest, ManagementRulesResponse } from '../../models/ManagementRules';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ManagementRulesService {
  private baseUrl = `${environment.apiUrl}/management-rules`;

  constructor(private http: HttpClient) {}

  listRules(): Observable<ApiResponse<ManagementRulesResponse[]>> {
    return this.http.get<ApiResponse<ManagementRulesResponse[]>>(`${this.baseUrl}/list`);
  }

  getRuleByTrackingId(trackingId: string): Observable<ApiResponse<ManagementRulesResponse>> {
    return this.http.get<ApiResponse<ManagementRulesResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  createRule(rule: ManagementRulesRequest): Observable<ApiResponse<ManagementRulesResponse>> {
    return this.http.post<ApiResponse<ManagementRulesResponse>>(`${this.baseUrl}/create`, rule);
  }

  updateRule(trackingId: string, rule: ManagementRulesRequest): Observable<ApiResponse<ManagementRulesResponse>> {
    return this.http.put<ApiResponse<ManagementRulesResponse>>(`${this.baseUrl}/update/${trackingId}`, rule);
  }

  deleteRule(trackingId: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/delete/${trackingId}`);
  }

  getActiveRule(): Observable<ApiResponse<ManagementRulesResponse>> {
    return this.http.get<ApiResponse<ManagementRulesResponse>>(`${this.baseUrl}/active`);
  }
}
