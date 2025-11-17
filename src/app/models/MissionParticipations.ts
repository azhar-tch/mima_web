import { Missions } from './Missions';
import { Agents } from './Agents';

export interface MissionParticipations {
    trackingId: string;
    mission?: Missions;
    missionTrackingId?: string;
    agent?: Agents;
    agentTrackingId?: string;
    missionRule: string;
    hoursCompleted: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface MissionParticipationsRequest {
    missionTrackingId: string;
    agentTrackingId: string;
    missionRule: string;
    hoursCompleted?: number;
}

export interface MissionParticipationsResponse {
    trackingId: string;
    missionTrackingId?: string;
    missionTitle?: string;
    agentTrackingId?: string;
    agentName?: string;
    missionRule: string;
    hoursCompleted: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateHoursRequest {
    hoursCompleted: number;
}
