import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ServicePosition, ServicePositionRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ServicePositionsService {
  private baseUrl = `${environment.apiUrl}/service-positions`;

  constructor(private http: HttpClient) {}

  create(request: ServicePositionRequest): Observable<ApiResponse<ServicePosition>> {
    return this.http.post<ApiResponse<ServicePosition>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: ServicePositionRequest): Observable<ApiResponse<ServicePosition>> {
    return this.http.put<ApiResponse<ServicePosition>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<ServicePosition>> {
    return this.http.get<ApiResponse<ServicePosition>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<ServicePosition[]>> {
    return this.http.get<ApiResponse<ServicePosition[]>>(`${this.baseUrl}/list`);
  }

  searchByName(positionName: string): Observable<ApiResponse<ServicePosition[]>> {
    const params = new HttpParams().set('positionName', positionName);
    return this.http.get<ApiResponse<ServicePosition[]>>(`${this.baseUrl}/search/name`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
