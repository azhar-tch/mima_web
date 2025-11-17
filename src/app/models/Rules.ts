export interface Rules {
    trackingId: string;
    title: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface RulesRequest {
    title: string;
    description?: string;
}

export interface RulesResponse {
    trackingId: string;
    title: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}
