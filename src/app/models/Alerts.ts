import { AlertStatus } from './enums';
import { Agents } from './Agents';

export interface Alerts {
    trackingId: string;
    alertType: string;
    description?: string;
    level: string;
    status: AlertStatus;
    agent?: Agents;
    agentTrackingId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AlertsRequest {
    alertType: string;
    description?: string;
    level: string;
    status?: AlertStatus;
    agentTrackingId: string;
}

export interface AlertsResponse {
    trackingId: string;
    alertType: string;
    description?: string;
    level: string;
    status: AlertStatus;
    agentTrackingId?: string;
    agentName?: string;
    createdAt?: string;
    updatedAt?: string;
}
