import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Award, AwardRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {
  private baseUrl = `${environment.apiUrl}/awards`;

  constructor(private http: HttpClient) {}

  create(request: AwardRequest): Observable<ApiResponse<Award>> {
    return this.http.post<ApiResponse<Award>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: AwardRequest): Observable<ApiResponse<Award>> {
    return this.http.put<ApiResponse<Award>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<Award>> {
    return this.http.get<ApiResponse<Award>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<Award[]>> {
    return this.http.get<ApiResponse<Award[]>>(`${this.baseUrl}/list`);
  }

  getByName(awardName: string): Observable<ApiResponse<Award>> {
    return this.http.get<ApiResponse<Award>>(`${this.baseUrl}/name/${awardName}`);
  }

  listByType(awardType: string): Observable<ApiResponse<Award[]>> {
    return this.http.get<ApiResponse<Award[]>>(`${this.baseUrl}/type/${awardType}`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
