import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OtherPosition, OtherPositionRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class OtherPositionsService {
  private baseUrl = `${environment.apiUrl}/other-positions`;

  constructor(private http: HttpClient) {}

  create(request: OtherPositionRequest): Observable<ApiResponse<OtherPosition>> {
    return this.http.post<ApiResponse<OtherPosition>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: OtherPositionRequest): Observable<ApiResponse<OtherPosition>> {
    return this.http.put<ApiResponse<OtherPosition>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<OtherPosition>> {
    return this.http.get<ApiResponse<OtherPosition>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<OtherPosition[]>> {
    return this.http.get<ApiResponse<OtherPosition[]>>(`${this.baseUrl}/list`);
  }

  searchByName(positionName: string): Observable<ApiResponse<OtherPosition[]>> {
    const params = new HttpParams().set('positionName', positionName);
    return this.http.get<ApiResponse<OtherPosition[]>>(`${this.baseUrl}/search/name`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
