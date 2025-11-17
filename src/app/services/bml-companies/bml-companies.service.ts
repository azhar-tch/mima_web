import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BMLCompany, BMLCompanyRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class BMLCompaniesService {
  private baseUrl = `${environment.apiUrl}/bml-companies`;

  constructor(private http: HttpClient) {}

  create(request: BMLCompanyRequest): Observable<ApiResponse<BMLCompany>> {
    return this.http.post<ApiResponse<BMLCompany>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: BMLCompanyRequest): Observable<ApiResponse<BMLCompany>> {
    return this.http.put<ApiResponse<BMLCompany>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<BMLCompany>> {
    return this.http.get<ApiResponse<BMLCompany>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<BMLCompany[]>> {
    return this.http.get<ApiResponse<BMLCompany[]>>(`${this.baseUrl}/list`);
  }

  searchByName(companyName: string): Observable<ApiResponse<BMLCompany[]>> {
    const params = new HttpParams().set('companyName', companyName);
    return this.http.get<ApiResponse<BMLCompany[]>>(`${this.baseUrl}/search/name`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
