import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShipProvisioning, ShipProvisioningRequest } from '../../models/Maritime';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ShipProvisioningsService {
  private baseUrl = `${environment.apiUrl}/ship-provisioning`;

  constructor(private http: HttpClient) {}

  create(request: ShipProvisioningRequest): Observable<ApiResponse<ShipProvisioning>> {
    return this.http.post<ApiResponse<ShipProvisioning>>(`${this.baseUrl}/create`, request);
  }

  update(trackingId: string, request: ShipProvisioningRequest): Observable<ApiResponse<ShipProvisioning>> {
    return this.http.put<ApiResponse<ShipProvisioning>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  get(trackingId: string): Observable<ApiResponse<ShipProvisioning>> {
    return this.http.get<ApiResponse<ShipProvisioning>>(`${this.baseUrl}/get/${trackingId}`);
  }

  list(): Observable<ApiResponse<ShipProvisioning[]>> {
    return this.http.get<ApiResponse<ShipProvisioning[]>>(`${this.baseUrl}/list`);
  }

  listByShip(commercialShipTrackingId: string): Observable<ApiResponse<ShipProvisioning[]>> {
    return this.http.get<ApiResponse<ShipProvisioning[]>>(`${this.baseUrl}/list/commercial-ship/${commercialShipTrackingId}`);
  }

  listByPeriod(startDate: string, endDate: string): Observable<ApiResponse<ShipProvisioning[]>> {
    return this.http.get<ApiResponse<ShipProvisioning[]>>(`${this.baseUrl}/list/period/${startDate}/${endDate}`);
  }

  listByProvisioningType(provisioningType: string): Observable<ApiResponse<ShipProvisioning[]>> {
    return this.http.get<ApiResponse<ShipProvisioning[]>>(`${this.baseUrl}/list/type/${provisioningType}`);
  }

  listBySupplier(supplierName: string): Observable<ApiResponse<ShipProvisioning[]>> {
    return this.http.get<ApiResponse<ShipProvisioning[]>>(`${this.baseUrl}/list/supplier/${supplierName}`);
  }

  listWithDelay(): Observable<ApiResponse<ShipProvisioning[]>> {
    return this.http.get<ApiResponse<ShipProvisioning[]>>(`${this.baseUrl}/list/with-delay`);
  }

  listByProductType(productType: string): Observable<ApiResponse<ShipProvisioning[]>> {
    return this.http.get<ApiResponse<ShipProvisioning[]>>(`${this.baseUrl}/list/product-type/${productType}`);
  }

  delete(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }
}
