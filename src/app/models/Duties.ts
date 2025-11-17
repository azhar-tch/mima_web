import { DutyType, DutyStatus } from './enums';
import { Agents } from './Agents';
import { Units } from './Units';

export interface Duties {
    trackingId: string;
    position: string;
    dutyType: DutyType;
    startDate: string;
    endDate: string;
    status: DutyStatus;
    agent?: Agents;
    agentTrackingId?: string;
    unit?: Units;
    unitTrackingId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface DutiesRequest {
    position: string;
    dutyType: DutyType;
    startDate: string;
    endDate: string;
    status?: DutyStatus;
    agentTrackingId: string;
    unitTrackingId: string;
}

export interface DutiesResponse {
    trackingId: string;
    position: string;
    dutyType: DutyType;
    startDate: string;
    endDate: string;
    status: DutyStatus;
    agentTrackingId?: string;
    agentName?: string;
    unitTrackingId?: string;
    unitName?: string;
    createDate?: string;
}
