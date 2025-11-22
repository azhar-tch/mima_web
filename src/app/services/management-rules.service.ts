import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ManagementRules,
  ManagementRulesRequest,
  RuleViolation,
  ValidationResult
} from '../models/management-rules.model';

@Injectable({
  providedIn: 'root'
})
export class ManagementRulesService {
  private baseUrl = `${environment.apiUrl}/management-rules`;
  private validationUrl = `${environment.apiUrl}/management-rules/validate`;

  constructor(private http: HttpClient) {}

  /**
   * Crée une nouvelle règle de gestion
   */
  create(request: ManagementRulesRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, request);
  }

  /**
   * Met à jour une règle de gestion
   */
  update(trackingId: string, request: ManagementRulesRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${trackingId}`, request);
  }

  /**
   * Récupère une règle de gestion par son trackingId
   */
  getByTrackingId(trackingId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${trackingId}`);
  }

  /**
   * Récupère toutes les règles de gestion
   */
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }

  /**
   * Supprime une règle de gestion
   */
  delete(trackingId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${trackingId}`);
  }

  /**
   * Valide une affectation contre toutes les règles
   */
  validateAssignment(
    agentTrackingId: string,
    startDate: string,
    endDate: string,
    currentMissionTrackingId?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('agentTrackingId', agentTrackingId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    if (currentMissionTrackingId) {
      params = params.set('currentMissionTrackingId', currentMissionTrackingId);
    }

    return this.http.post(`${this.validationUrl}/assignment`, null, { params });
  }

  /**
   * Vérifie la double affectation
   */
  checkDoubleAssignment(
    agentTrackingId: string,
    startDate: string,
    endDate: string,
    currentMissionTrackingId?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('agentTrackingId', agentTrackingId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    if (currentMissionTrackingId) {
      params = params.set('currentMissionTrackingId', currentMissionTrackingId);
    }

    return this.http.get(`${this.validationUrl}/double-assignment`, { params });
  }

  /**
   * Vérifie le repos minimal
   */
  checkMinimumRest(
    agentTrackingId: string,
    newMissionStartDate: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('agentTrackingId', agentTrackingId)
      .set('newMissionStartDate', newMissionStartDate);

    return this.http.get(`${this.validationUrl}/minimum-rest`, { params });
  }

  /**
   * Vérifie la durée hebdomadaire
   */
  checkWeeklyHours(
    agentTrackingId: string,
    weekStartDate: string,
    additionalHours: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('agentTrackingId', agentTrackingId)
      .set('weekStartDate', weekStartDate)
      .set('additionalHours', additionalHours.toString());

    return this.http.get(`${this.validationUrl}/weekly-hours`, { params });
  }

  /**
   * Détecte les absences non justifiées
   */
  detectUnjustifiedAbsences(): Observable<any> {
    return this.http.get(`${this.validationUrl}/unjustified-absences`);
  }

  /**
   * Vérifie l'équité de répartition
   */
  checkEquityDistribution(periodStart: string, periodEnd: string): Observable<any> {
    const params = new HttpParams()
      .set('periodStart', periodStart)
      .set('periodEnd', periodEnd);

    return this.http.get(`${this.validationUrl}/equity-distribution`, { params });
  }

  /**
   * Calcule les heures travaillées
   */
  calculateWorkedHours(
    agentTrackingId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('agentTrackingId', agentTrackingId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get(`${this.validationUrl}/worked-hours`, { params });
  }
}
