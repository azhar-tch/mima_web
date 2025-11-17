import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RulesRequest, RulesResponse } from '../../models/Rules';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private baseUrl = `${environment.apiUrl}/rules`;

  constructor(private http: HttpClient) {}

  createRule(request: RulesRequest): Observable<ApiResponse<RulesResponse>> {
    return this.http.post<ApiResponse<RulesResponse>>(`${this.baseUrl}/create`, request);
  }

  updateRule(trackingId: string, request: RulesRequest): Observable<ApiResponse<RulesResponse>> {
    return this.http.put<ApiResponse<RulesResponse>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  getRule(trackingId: string): Observable<ApiResponse<RulesResponse>> {
    return this.http.get<ApiResponse<RulesResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  listRules(): Observable<ApiResponse<RulesResponse[]>> {
    return this.http.get<ApiResponse<RulesResponse[]>>(`${this.baseUrl}/list`);
  }

  deleteRule(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
