import { UnitStatus, UnitType } from './enums';
import { Agents } from './Agents';

export interface Units {
    trackingId: string;
    name: string;
    type: UnitType;
    description?: string;
    chief?: Agents;
    chiefTrackingId?: string;
    status: UnitStatus;
    createDate?: string;
    updateDate?: string;
}

export interface UnitsRequest {
    name: string;
    description?: string;
    type: UnitType;
    chiefTrackingId?: string;
    status?: UnitStatus;
}

export interface UnitsResponse {
    trackingId: string;
    name: string;
    type: UnitType;
    description?: string;
    chiefName?: string;
    chiefTrackingId?: string;
    status: UnitStatus;
    createDate?: string;
}
