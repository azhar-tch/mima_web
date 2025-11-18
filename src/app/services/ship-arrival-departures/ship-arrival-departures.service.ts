import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShipArrivalDeparture, ShipArrivalDepartureRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ShipArrivalDeparturesService {
  private baseUrl = `${environment.apiUrl}/ship-arrivals-departures`;

  constructor(private http: HttpClient) {}

  create(request: ShipArrivalDepartureRequest): Observable<ApiResponse<ShipArrivalDeparture>> {
    return this.http.post<ApiResponse<ShipArrivalDeparture>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: ShipArrivalDepartureRequest): Observable<ApiResponse<ShipArrivalDeparture>> {
    return this.http.put<ApiResponse<ShipArrivalDeparture>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<ShipArrivalDeparture>> {
    return this.http.get<ApiResponse<ShipArrivalDeparture>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<ShipArrivalDeparture[]>> {
    return this.http.get<ApiResponse<ShipArrivalDeparture[]>>(`${this.baseUrl}/list`);
  }

  listByShip(commercialShipTrackingId: string): Observable<ApiResponse<ShipArrivalDeparture[]>> {
    return this.http.get<ApiResponse<ShipArrivalDeparture[]>>(`${this.baseUrl}/list/commercial-ship/${commercialShipTrackingId}`);
  }

  listCurrentlyInPort(): Observable<ApiResponse<ShipArrivalDeparture[]>> {
    return this.http.get<ApiResponse<ShipArrivalDeparture[]>>(`${this.baseUrl}/list/currently-in-port`);
  }

  listByArrivalPeriod(startDate: string, endDate: string): Observable<ApiResponse<ShipArrivalDeparture[]>> {
    return this.http.get<ApiResponse<ShipArrivalDeparture[]>>(`${this.baseUrl}/list/arrivals/${startDate}/${endDate}`);
  }

  listByDeparturePeriod(startDate: string, endDate: string): Observable<ApiResponse<ShipArrivalDeparture[]>> {
    return this.http.get<ApiResponse<ShipArrivalDeparture[]>>(`${this.baseUrl}/list/departures/${startDate}/${endDate}`);
  }

  listByPortOfOrigin(portOfOrigin: string): Observable<ApiResponse<ShipArrivalDeparture[]>> {
    return this.http.get<ApiResponse<ShipArrivalDeparture[]>>(`${this.baseUrl}/list/port-of-origin/${portOfOrigin}`);
  }

  listByNextDestination(nextDestination: string): Observable<ApiResponse<ShipArrivalDeparture[]>> {
    return this.http.get<ApiResponse<ShipArrivalDeparture[]>>(`${this.baseUrl}/list/next-destination/${nextDestination}`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
