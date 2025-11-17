import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PersonnelAllowance, PersonnelAllowanceRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class PersonnelAllowancesService {
  private baseUrl = `${environment.apiUrl}/personnel-allowances`;

  constructor(private http: HttpClient) {}

  create(request: PersonnelAllowanceRequest): Observable<ApiResponse<PersonnelAllowance>> {
    return this.http.post<ApiResponse<PersonnelAllowance>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: PersonnelAllowanceRequest): Observable<ApiResponse<PersonnelAllowance>> {
    return this.http.put<ApiResponse<PersonnelAllowance>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<PersonnelAllowance>> {
    return this.http.get<ApiResponse<PersonnelAllowance>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<PersonnelAllowance[]>> {
    return this.http.get<ApiResponse<PersonnelAllowance[]>>(`${this.baseUrl}/list`);
  }

  listActive(): Observable<ApiResponse<PersonnelAllowance[]>> {
    return this.http.get<ApiResponse<PersonnelAllowance[]>>(`${this.baseUrl}/list/active`);
  }

  searchByRank(maritimeRank: string): Observable<ApiResponse<PersonnelAllowance>> {
    const params = new HttpParams().set('maritimeRank', maritimeRank);
    return this.http.get<ApiResponse<PersonnelAllowance>>(`${this.baseUrl}/search/rank`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
