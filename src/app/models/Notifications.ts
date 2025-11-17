import { Users } from './Users';

export interface Notifications {
    trackingId: string;
    message: string;
    notificationType: string;
    isRead: boolean;
    recipient?: Users;
    recipientTrackingId?: string;
    createDate?: string;
    updatedAt?: string;
}

export interface NotificationsRequest {
    message: string;
    notificationType: string;
    recipientTrackingId: string;
}

export interface NotificationsResponse {
    trackingId: string;
    message: string;
    notificationType: string;
    isRead: boolean;
    recipientTrackingId?: string;
    recipientName?: string;
    createDate?: string;
    updatedAt?: string;
}

export interface NotificationMarkReadRequest {
    isRead: boolean;
}
