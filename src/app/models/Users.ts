import { Rules } from './Rules';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface Users {
    trackingId: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    fcmToken?: string;
    rule?: Rules;
    ruleTrackingId?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface UsersRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    fcmToken?: string;
    ruleTrackingId: string;
    isActive?: boolean;
}

export interface UsersResponse {
    trackingId: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    fcmToken?: string;
    ruleTrackingId?: string;
    rule?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface LoginResponse {
    token: string;
    user: UsersResponse;
    message: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    ruleTrackingId?: string;
}
