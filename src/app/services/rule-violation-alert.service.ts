import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  RuleViolationAlert,
  AlertStatus,
  RuleType,
  SeverityLevel
} from '../models/management-rules.model';

@Injectable({
  providedIn: 'root'
})
export class RuleViolationAlertService {
  private baseUrl = `${environment.apiUrl}/rule-violation-alerts`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère toutes les alertes actives
   */
  getActiveAlerts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/active`);
  }

  /**
   * Récupère les alertes critiques actives
   */
  getCriticalActiveAlerts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/critical`);
  }

  /**
   * Récupère les alertes d'un agent
   */
  getAlertsByAgent(agentTrackingId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-agent/${agentTrackingId}`);
  }

  /**
   * Récupère les alertes par statut
   */
  getAlertsByStatus(status: AlertStatus): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-status/${status}`);
  }

  /**
   * Récupère les alertes par type de règle
   */
  getAlertsByRuleType(ruleType: RuleType): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-rule-type/${ruleType}`);
  }

  /**
   * Récupère les alertes sur une période
   */
  getAlertsByPeriod(startDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get(`${this.baseUrl}/by-period`, { params });
  }

  /**
   * Récupère une alerte par son trackingId
   */
  getAlert(trackingId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${trackingId}`);
  }

  /**
   * Résout une alerte
   */
  resolveAlert(trackingId: string, resolvedByUserId: string, comment?: string): Observable<any> {
    let params = new HttpParams()
      .set('resolvedByUserId', resolvedByUserId);

    if (comment) {
      params = params.set('comment', comment);
    }

    return this.http.put(`${this.baseUrl}/${trackingId}/resolve`, null, { params });
  }

  /**
   * Annule une alerte (override)
   */
  overrideAlert(trackingId: string, overriddenByUserId: string, comment?: string): Observable<any> {
    let params = new HttpParams()
      .set('overriddenByUserId', overriddenByUserId);

    if (comment) {
      params = params.set('comment', comment);
    }

    return this.http.put(`${this.baseUrl}/${trackingId}/override`, null, { params });
  }

  /**
   * Rejette une alerte
   */
  dismissAlert(trackingId: string, dismissedByUserId: string, comment?: string): Observable<any> {
    let params = new HttpParams()
      .set('dismissedByUserId', dismissedByUserId);

    if (comment) {
      params = params.set('comment', comment);
    }

    return this.http.put(`${this.baseUrl}/${trackingId}/dismiss`, null, { params });
  }

  /**
   * Compte les alertes actives
   */
  countActiveAlerts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/count/active`);
  }

  /**
   * Compte les alertes critiques actives
   */
  countCriticalActiveAlerts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/count/critical`);
  }
}
