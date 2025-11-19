import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PALEntryExit, PALEntryExitRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class PALEntryExitsService {
  private baseUrl = `${environment.apiUrl}/pal-entry-exits`;

  constructor(private http: HttpClient) {}

  create(request: PALEntryExitRequest): Observable<ApiResponse<PALEntryExit>> {
    return this.http.post<ApiResponse<PALEntryExit>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: PALEntryExitRequest): Observable<ApiResponse<PALEntryExit>> {
    return this.http.put<ApiResponse<PALEntryExit>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<PALEntryExit>> {
    return this.http.get<ApiResponse<PALEntryExit>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<PALEntryExit[]>> {
    return this.http.get<ApiResponse<PALEntryExit[]>>(`${this.baseUrl}/list`);
  }

  listByShip(commercialShipTrackingId: string): Observable<ApiResponse<PALEntryExit[]>> {
    return this.http.get<ApiResponse<PALEntryExit[]>>(`${this.baseUrl}/list/ship/${commercialShipTrackingId}`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }

  search(term?: string): Observable<ApiResponse<PALEntryExit[]>> {
    const params = term ? new HttpParams().set('term', term) : new HttpParams();
    return this.http.get<ApiResponse<PALEntryExit[]>>(`${this.baseUrl}/search`, { params });
  }
}
