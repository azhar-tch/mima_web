import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HRGrade, HRGradeRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class HRGradesService {
  private baseUrl = `${environment.apiUrl}/hr-grades`;

  constructor(private http: HttpClient) {}

  create(request: HRGradeRequest): Observable<ApiResponse<HRGrade>> {
    return this.http.post<ApiResponse<HRGrade>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: HRGradeRequest): Observable<ApiResponse<HRGrade>> {
    return this.http.put<ApiResponse<HRGrade>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<HRGrade>> {
    return this.http.get<ApiResponse<HRGrade>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<HRGrade[]>> {
    return this.http.get<ApiResponse<HRGrade[]>>(`${this.baseUrl}/list`);
  }

  searchByName(gradeName: string): Observable<ApiResponse<HRGrade[]>> {
    const params = new HttpParams().set('gradeName', gradeName);
    return this.http.get<ApiResponse<HRGrade[]>>(`${this.baseUrl}/search/name`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
