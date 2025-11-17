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

  getByOperationNumber(operationNumber: string): Observable<ApiResponse<STSOperation>> {
    return this.http.get<ApiResponse<STSOperation>>(`${this.baseUrl}/get/operation-number/${operationNumber}`);
  }

  listByMotherVessel(vesselTrackingId: string): Observable<ApiResponse<STSOperation[]>> {
    return this.http.get<ApiResponse<STSOperation[]>>(`${this.baseUrl}/list/mother-vessel/${vesselTrackingId}`);
  }

  listByReceivingVessel(vesselTrackingId: string): Observable<ApiResponse<STSOperation[]>> {
    return this.http.get<ApiResponse<STSOperation[]>>(`${this.baseUrl}/list/receiving-vessel/${vesselTrackingId}`);
  }

  listBySupervisingVessel(vesselTrackingId: string): Observable<ApiResponse<STSOperation[]>> {
    return this.http.get<ApiResponse<STSOperation[]>>(`${this.baseUrl}/list/supervising-vessel/${vesselTrackingId}`);
  }

  listOngoing(): Observable<ApiResponse<STSOperation[]>> {
    return this.http.get<ApiResponse<STSOperation[]>>(`${this.baseUrl}/list/ongoing`);
  }

  listByStatus(status: string): Observable<ApiResponse<STSOperation[]>> {
    return this.http.get<ApiResponse<STSOperation[]>>(`${this.baseUrl}/list/status/${status}`);
  }

  listByPeriod(startDate: string, endDate: string): Observable<ApiResponse<STSOperation[]>> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<ApiResponse<STSOperation[]>>(`${this.baseUrl}/list/period`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
