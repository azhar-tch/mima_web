import { MissionStatus } from './enums';
import { Units } from './Units';

export interface Missions {
    trackingId: string;
    type: string;
    title: string;
    location: string;
    shipName?: string;
    objective?: string;
    plannedStartDate: string;
    plannedEndDate: string;
    actualStartDate?: string;
    actualEndDate?: string;
    status: MissionStatus;
    unit?: Units;
    unitTrackingId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface MissionsRequest {
    type: string;
    title: string;
    location: string;
    shipName?: string;
    objective?: string;
    plannedStartDate: string;
    plannedEndDate: string;
    actualStartDate?: string;
    actualEndDate?: string;
    status?: MissionStatus;

    // Ancienne méthode (rétrocompatibilité)
    unitTrackingId?: string;

    // Nouvelles méthodes pour plusieurs unités et agents
    unitTrackingIds?: string[];
    agentTrackingIds?: string[];
}

export interface MissionsResponse {
    trackingId: string;
    type: string;
    title: string;
    location: string;
    shipName?: string;
    objective?: string;
    plannedStartDate: string;
    plannedEndDate: string;
    actualStartDate?: string;
    actualEndDate?: string;
    status: MissionStatus;

    // Ancienne méthode (rétrocompatibilité)
    unitName?: string;
    unitTrackingId?: string;

    // Nouvelles listes pour plusieurs unités et agents
    unitNames?: string[];
    unitTrackingIds?: string[];
    agentNames?: string[];
    agentTrackingIds?: string[];

    createdAt?: string;
    updatedAt?: string;
}
