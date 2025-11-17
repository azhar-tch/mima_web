import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NavalVessel, NavalVesselRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class NavalVesselsService {
  private baseUrl = `${environment.apiUrl}/naval-vessels`;

  constructor(private http: HttpClient) {}

  create(request: NavalVesselRequest): Observable<ApiResponse<NavalVessel>> {
    return this.http.post<ApiResponse<NavalVessel>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: NavalVesselRequest): Observable<ApiResponse<NavalVessel>> {
    return this.http.put<ApiResponse<NavalVessel>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<NavalVessel>> {
    return this.http.get<ApiResponse<NavalVessel>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<NavalVessel[]>> {
    return this.http.get<ApiResponse<NavalVessel[]>>(`${this.baseUrl}/list`);
  }

  getByVesselNumber(vesselNumber: string): Observable<ApiResponse<NavalVessel>> {
    return this.http.get<ApiResponse<NavalVessel>>(`${this.baseUrl}/get/vessel-number/${vesselNumber}`);
  }

  listByType(vesselType: string): Observable<ApiResponse<NavalVessel[]>> {
    return this.http.get<ApiResponse<NavalVessel[]>>(`${this.baseUrl}/list/type/${vesselType}`);
  }

  listByStatus(status: string): Observable<ApiResponse<NavalVessel[]>> {
    return this.http.get<ApiResponse<NavalVessel[]>>(`${this.baseUrl}/list/status/${status}`);
  }

  listAvailable(): Observable<ApiResponse<NavalVessel[]>> {
    return this.http.get<ApiResponse<NavalVessel[]>>(`${this.baseUrl}/list/available`);
  }

  listPatrol(): Observable<ApiResponse<NavalVessel[]>> {
    return this.http.get<ApiResponse<NavalVessel[]>>(`${this.baseUrl}/list/patrol`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
