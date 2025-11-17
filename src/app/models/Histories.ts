import { ActionType } from './enums';

export interface Histories {
    trackingId: string;
    agentTrackingId?: string;
    entityName: string;
    entityTrackingId?: string;
    actionType: ActionType;
    changesSummary?: string;
    oldValue?: string;
    newValue?: string;
    details?: string;
    createDate?: string;
}

export interface HistoriesRequest {
    agentTrackingId: string;
    entityName: string;
    entityTrackingId: string;
    actionType: ActionType;
    changesSummary?: string;
    oldValue?: string;
    newValue?: string;
    details?: string;
}

export interface HistoriesResponse {
    trackingId: string;
    agentName?: string;
    entityName: string;
    entityTrackingId?: string;
    actionType: ActionType;
    changesSummary?: string;
    oldValue?: string;
    newValue?: string;
    details?: string;
    createDate?: string;
}
