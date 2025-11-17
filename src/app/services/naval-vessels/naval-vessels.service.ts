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

  listActive(): Observable<ApiResponse<NavalVessel[]>> {
    return this.http.get<ApiResponse<NavalVessel[]>>(`${this.baseUrl}/list/active`);
  }

  listOperational(): Observable<ApiResponse<NavalVessel[]>> {
    return this.http.get<ApiResponse<NavalVessel[]>>(`${this.baseUrl}/list/operational`);
  }

  searchByName(vesselName: string): Observable<ApiResponse<NavalVessel[]>> {
    const params = new HttpParams().set('vesselName', vesselName);
    return this.http.get<ApiResponse<NavalVessel[]>>(`${this.baseUrl}/search/name`, { params });
  }

  searchByVesselNumber(vesselNumber: string): Observable<ApiResponse<NavalVessel>> {
    const params = new HttpParams().set('vesselNumber', vesselNumber);
    return this.http.get<ApiResponse<NavalVessel>>(`${this.baseUrl}/search/number`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
