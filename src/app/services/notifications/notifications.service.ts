import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/api-response';
import { NotificationsRequest, NotificationsResponse } from '../../models/Notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private baseUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) {}

  // 🔹 CRUD Notifications
  createNotification(request: NotificationsRequest): Observable<ApiResponse<NotificationsResponse>> {
    return this.http.post<ApiResponse<NotificationsResponse>>(`${this.baseUrl}/create`, request);
  }

  updateNotification(trackingId: string, request: NotificationsRequest): Observable<ApiResponse<NotificationsResponse>> {
    return this.http.put<ApiResponse<NotificationsResponse>>(`${this.baseUrl}/update/${trackingId}`, request);
  }

  getNotification(trackingId: string): Observable<ApiResponse<NotificationsResponse>> {
    return this.http.get<ApiResponse<NotificationsResponse>>(`${this.baseUrl}/get/${trackingId}`);
  }

  listNotifications(): Observable<ApiResponse<NotificationsResponse[]>> {
    return this.http.get<ApiResponse<NotificationsResponse[]>>(`${this.baseUrl}/list`);
  }

  deleteNotification(trackingId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${trackingId}`);
  }

  // ✅ Marquer une notification comme lue / non lue
  markAsRead(trackingId: string): Observable<ApiResponse<NotificationsResponse>> {
    return this.http.put<ApiResponse<NotificationsResponse>>(`${this.baseUrl}/read/${trackingId}`, {});
  }

  // ✅ Récupérer toutes les notifications d’un utilisateur
 listByRecipient(recipientTrackingId: string): Observable<ApiResponse<NotificationsResponse[]>> {
  return this.http.get<ApiResponse<NotificationsResponse[]>>(`${this.baseUrl}/recipient/${recipientTrackingId}`);
}

listByIsRead(isRead: boolean): Observable<ApiResponse<NotificationsResponse[]>> {
  return this.http.get<ApiResponse<NotificationsResponse[]>>(`${this.baseUrl}/read/${isRead}`);
}

}
