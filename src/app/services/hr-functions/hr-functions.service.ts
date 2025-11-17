import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HRFunction, HRFunctionRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class HRFunctionsService {
  private baseUrl = `${environment.apiUrl}/hr-functions`;

  constructor(private http: HttpClient) {}

  create(request: HRFunctionRequest): Observable<ApiResponse<HRFunction>> {
    return this.http.post<ApiResponse<HRFunction>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: HRFunctionRequest): Observable<ApiResponse<HRFunction>> {
    return this.http.put<ApiResponse<HRFunction>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<HRFunction>> {
    return this.http.get<ApiResponse<HRFunction>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<HRFunction[]>> {
    return this.http.get<ApiResponse<HRFunction[]>>(`${this.baseUrl}/list`);
  }

  searchByName(functionName: string): Observable<ApiResponse<HRFunction[]>> {
    const params = new HttpParams().set('functionName', functionName);
    return this.http.get<ApiResponse<HRFunction[]>>(`${this.baseUrl}/search/name`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
