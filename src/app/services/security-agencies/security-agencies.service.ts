import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SecurityAgency, SecurityAgencyRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class SecurityAgenciesService {
  private baseUrl = `${environment.apiUrl}/security-agencies`;

  constructor(private http: HttpClient) {}

  create(request: SecurityAgencyRequest): Observable<ApiResponse<SecurityAgency>> {
    return this.http.post<ApiResponse<SecurityAgency>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: SecurityAgencyRequest): Observable<ApiResponse<SecurityAgency>> {
    return this.http.put<ApiResponse<SecurityAgency>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<SecurityAgency>> {
    return this.http.get<ApiResponse<SecurityAgency>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<SecurityAgency[]>> {
    return this.http.get<ApiResponse<SecurityAgency[]>>(`${this.baseUrl}/list`);
  }

  listActive(): Observable<ApiResponse<SecurityAgency[]>> {
    return this.http.get<ApiResponse<SecurityAgency[]>>(`${this.baseUrl}/list/active`);
  }

  searchByName(agencyName: string): Observable<ApiResponse<SecurityAgency[]>> {
    const params = new HttpParams().set('agencyName', agencyName);
    return this.http.get<ApiResponse<SecurityAgency[]>>(`${this.baseUrl}/search/name`, { params });
  }

  searchByAgencyNumber(agencyNumber: string): Observable<ApiResponse<SecurityAgency>> {
    const params = new HttpParams().set('agencyNumber', agencyNumber);
    return this.http.get<ApiResponse<SecurityAgency>>(`${this.baseUrl}/search/number`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
