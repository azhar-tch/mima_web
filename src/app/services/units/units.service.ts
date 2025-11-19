import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UnitsRequest, UnitsResponse } from '../../models/Units';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  private baseUrl = `${environment.apiUrl}/units`;

  constructor(private http: HttpClient) {}

  createUnit(request: UnitsRequest): Observable<ApiResponse<UnitsResponse>> {
    return this.http.post<ApiResponse<UnitsResponse>>(`${this.baseUrl}/create`, request);
  }

  updateUnit(trackingId: string, request: UnitsRequest): Observable<ApiResponse<UnitsResponse>> {
    return this.http.put<ApiResponse<UnitsResponse>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  getUnit(trackingId: string): Observable<ApiResponse<UnitsResponse>> {
    return this.http.get<ApiResponse<UnitsResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  listUnits(): Observable<ApiResponse<UnitsResponse[]>> {
    return this.http.get<ApiResponse<UnitsResponse[]>>(`${this.baseUrl}/list`);
  }

  deleteUnit(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }

  searchUnits(term?: string): Observable<ApiResponse<UnitsResponse[]>> {
    const params = term ? new HttpParams().set('term', term) : new HttpParams();
    return this.http.get<ApiResponse<UnitsResponse[]>>(`${this.baseUrl}/search`, { params });
  }
}
