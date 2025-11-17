import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Training, TrainingRequest } from '../../models/HRManagement';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  private baseUrl = `${environment.apiUrl}/trainings`;

  constructor(private http: HttpClient) {}

  create(request: TrainingRequest): Observable<ApiResponse<Training>> {
    return this.http.post<ApiResponse<Training>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: TrainingRequest): Observable<ApiResponse<Training>> {
    return this.http.put<ApiResponse<Training>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<Training>> {
    return this.http.get<ApiResponse<Training>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<Training[]>> {
    return this.http.get<ApiResponse<Training[]>>(`${this.baseUrl}/list`);
  }

  searchByName(trainingName: string): Observable<ApiResponse<Training[]>> {
    const params = new HttpParams().set('trainingName', trainingName);
    return this.http.get<ApiResponse<Training[]>>(`${this.baseUrl}/search/name`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
