import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationsResponse } from '../../models/Notifications';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationStreamService {
  private eventSource: EventSource | null = null;
  private notificationsSubject = new Subject<NotificationsResponse>();
  private connectionStatusSubject = new Subject<string>();

  constructor(
    private ngZone: NgZone,
    private authService: AuthService
  ) {}

  /**
   * Se connecte au flux SSE pour recevoir les notifications en temps réel
   */
  connect(userTrackingId: string): Observable<NotificationsResponse> {
    if (this.eventSource) {
      this.disconnect();
    }

    // Récupérer le token JWT pour l'authentification
    const token = this.authService.getToken();
    if (!token) {
      console.error('No authentication token found');
      this.connectionStatusSubject.next('error');
      return this.notificationsSubject.asObservable();
    }

    // Passer le token dans l'URL comme paramètre de requête
    const url = `${environment.apiUrl}/notifications/stream/${userTrackingId}?token=${encodeURIComponent(token)}`;

    this.eventSource = new EventSource(url);

    // Message de connexion initial
    this.eventSource.addEventListener('connected', (event: MessageEvent) => {
      this.ngZone.run(() => {
        console.log('Connected to notification stream:', event.data);
        this.connectionStatusSubject.next('connected');
      });
    });

    // Réception des notifications
    this.eventSource.addEventListener('notification', (event: MessageEvent) => {
      this.ngZone.run(() => {
        const notification = JSON.parse(event.data);
        console.log('New notification received:', notification);
        this.notificationsSubject.next(notification);
      });
    });

    // Gestion des erreurs
    this.eventSource.onerror = (error) => {
      this.ngZone.run(() => {
        console.error('SSE connection error:', error);
        this.connectionStatusSubject.next('error');
        this.disconnect();
      });
    };

    return this.notificationsSubject.asObservable();
  }

  /**
   * Observable pour surveiller l'état de la connexion
   */
  getConnectionStatus(): Observable<string> {
    return this.connectionStatusSubject.asObservable();
  }

  /**
   * Ferme la connexion SSE
   */
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      console.log('Disconnected from notification stream');
      this.connectionStatusSubject.next('disconnected');
    }
  }

  /**
   * Vérifie si la connexion est active
   */
  isConnected(): boolean {
    return this.eventSource !== null && this.eventSource.readyState === EventSource.OPEN;
  }
}
