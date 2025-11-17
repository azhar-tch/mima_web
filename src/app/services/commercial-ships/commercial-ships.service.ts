import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommercialShip, CommercialShipRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CommercialShipsService {
  private baseUrl = `${environment.apiUrl}/commercial-ships`;

  constructor(private http: HttpClient) {}

  create(request: CommercialShipRequest): Observable<ApiResponse<CommercialShip>> {
    return this.http.post<ApiResponse<CommercialShip>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: CommercialShipRequest): Observable<ApiResponse<CommercialShip>> {
    return this.http.put<ApiResponse<CommercialShip>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<CommercialShip>> {
    return this.http.get<ApiResponse<CommercialShip>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<CommercialShip[]>> {
    return this.http.get<ApiResponse<CommercialShip[]>>(`${this.baseUrl}/list`);
  }

  getByImo(imoNumber: string): Observable<ApiResponse<CommercialShip>> {
    return this.http.get<ApiResponse<CommercialShip>>(`${this.baseUrl}/get/imo/${imoNumber}`);
  }

  listByType(shipType: string): Observable<ApiResponse<CommercialShip[]>> {
    return this.http.get<ApiResponse<CommercialShip[]>>(`${this.baseUrl}/list/type/${shipType}`);
  }

  listByStatus(status: string): Observable<ApiResponse<CommercialShip[]>> {
    return this.http.get<ApiResponse<CommercialShip[]>>(`${this.baseUrl}/list/status/${status}`);
  }

  listByFlag(flag: string): Observable<ApiResponse<CommercialShip[]>> {
    return this.http.get<ApiResponse<CommercialShip[]>>(`${this.baseUrl}/list/flag/${flag}`);
  }

  listByArrivalPeriod(startDate: string, endDate: string): Observable<ApiResponse<CommercialShip[]>> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<ApiResponse<CommercialShip[]>>(`${this.baseUrl}/list/arrivals`, { params });
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
