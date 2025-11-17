import { AbsenceType, AbsenceStatus } from './enums';
import { Agents } from './Agents';
import { Users } from './Users';

export interface Absences {
    trackingId: string;
    absenceType: AbsenceType;
    startDate: string;
    endDate: string;
    justification?: string;
    status: AbsenceStatus;
    reason?: string;
    supervisorComment?: string;
    agent?: Agents;
    agentTrackingId?: string;
    validatedBy?: Users;
    validatedByTrackingId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AbsencesRequest {
    absenceType: AbsenceType;
    startDate: string;
    endDate: string;
    justification?: string;
    status?: AbsenceStatus;
    reason?: string;
    agentTrackingId: string;
}

export interface AbsencesResponse {
    trackingId: string;
    absenceType: AbsenceType;
    startDate: string;
    endDate: string;
    justification?: string;
    status: AbsenceStatus;
    reason?: string;
    supervisorComment?: string;
    agentTrackingId?: string;
    agentName?: string;
    validatedByTrackingId?: string;
    validatedByName?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AbsenceValidationRequest {
    status: AbsenceStatus;
    supervisorComment?: string;
}
