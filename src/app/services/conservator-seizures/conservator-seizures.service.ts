import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConservatorSeizure, ConservatorSeizureRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ConservatorSeizuresService {
  private baseUrl = `${environment.apiUrl}/conservator-seizures`;

  constructor(private http: HttpClient) {}

  create(request: ConservatorSeizureRequest): Observable<ApiResponse<ConservatorSeizure>> {
    return this.http.post<ApiResponse<ConservatorSeizure>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: ConservatorSeizureRequest): Observable<ApiResponse<ConservatorSeizure>> {
    return this.http.put<ApiResponse<ConservatorSeizure>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<ConservatorSeizure>> {
    return this.http.get<ApiResponse<ConservatorSeizure>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<ConservatorSeizure[]>> {
    return this.http.get<ApiResponse<ConservatorSeizure[]>>(`${this.baseUrl}/list`);
  }

  listByShip(commercialShipTrackingId: string): Observable<ApiResponse<ConservatorSeizure[]>> {
    return this.http.get<ApiResponse<ConservatorSeizure[]>>(`${this.baseUrl}/list/ship/${commercialShipTrackingId}`);
  }

  listActive(): Observable<ApiResponse<ConservatorSeizure[]>> {
    return this.http.get<ApiResponse<ConservatorSeizure[]>>(`${this.baseUrl}/list/active`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
