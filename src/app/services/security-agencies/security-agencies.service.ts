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

  getByAgencyNumber(agencyNumber: string): Observable<ApiResponse<SecurityAgency>> {
    return this.http.get<ApiResponse<SecurityAgency>>(`${this.baseUrl}/get/agency-number/${agencyNumber}`);
  }

  searchByName(agencyName: string): Observable<ApiResponse<SecurityAgency[]>> {
    return this.http.get<ApiResponse<SecurityAgency[]>>(`${this.baseUrl}/list/name/${agencyName}`);
  }

  listActive(): Observable<ApiResponse<SecurityAgency[]>> {
    return this.http.get<ApiResponse<SecurityAgency[]>>(`${this.baseUrl}/list/active`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }

  search(term?: string): Observable<ApiResponse<SecurityAgency[]>> {
    const params = term ? new HttpParams().set('term', term) : new HttpParams();
    return this.http.get<ApiResponse<SecurityAgency[]>>(`${this.baseUrl}/search`, { params });
  }
}
