import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { STSOperation, STSOperationRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class STSOperationsService {
  private baseUrl = `${environment.apiUrl}/sts-operations`;

  constructor(private http: HttpClient) {}

  create(request: STSOperationRequest): Observable<ApiResponse<STSOperation>> {
    return this.http.post<ApiResponse<STSOperation>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: STSOperationRequest): Observable<ApiResponse<STSOperation>> {
    return this.http.put<ApiResponse<STSOperation>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<STSOperation>> {
    return this.http.get<ApiResponse<STSOperation>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<STSOperation[]>> {
    return this.http.get<ApiResponse<STSOperation[]>>(`${this.baseUrl}/list`);
  }

  listCompleted(): Observable<ApiResponse<STSOperation[]>> {
    return this.http.get<ApiResponse<STSOperation[]>>(`${this.baseUrl}/list/completed`);
  }

  listWithPollution(): Observable<ApiResponse<STSOperation[]>> {
    return this.http.get<ApiResponse<STSOperation[]>>(`${this.baseUrl}/list/pollution`);
  }

  searchByOperationNumber(operationNumber: string): Observable<ApiResponse<STSOperation>> {
    const params = new HttpParams().set('operationNumber', operationNumber);
    return this.http.get<ApiResponse<STSOperation>>(`${this.baseUrl}/search/number`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
