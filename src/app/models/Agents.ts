import { AgentStatus } from './enums';
import { Units } from './Units';

export interface Agents {
    trackingId: string;
    registrationNo: string;
    firstName: string;
    lastName: string;
    rank: string;
    unit?: Units;
    unitTrackingId?: string;
    availability: boolean;
    status: AgentStatus;
    createDate?: string;
    nationality?: string;
    city?: string;
    emergencyContact?: string;
    maritalStatus?: string;
    recruitmentDate?: string;
    contractEndDate?: string;
    idCardNumber?: string;
    passportNumber?: string;
    idExpiryDate?: string;
    insuranceNumber?: string;
    bankAccount?: string;
}

export interface AgentsRequest {
    registrationNo: string;
    firstName: string;
    lastName: string;
    rank: string;
    unitTrackingId: string;
    availability?: boolean;
    status?: AgentStatus;
    nationality?: string;
    city?: string;
    emergencyContact?: string;
    maritalStatus?: string;
    recruitmentDate?: string;
    contractEndDate?: string;
    idCardNumber?: string;
    passportNumber?: string;
    idExpiryDate?: string;
    insuranceNumber?: string;
    bankAccount?: string;
}

export interface AgentsResponse {
    trackingId: string;
    registrationNo: string;
    firstName: string;
    lastName: string;
    rank: string;
    unitName?: string;
    unitTrackingId?: string;
    availability: boolean;
    status: AgentStatus;
    createDate?: string;
    nationality?: string;
    city?: string;
    emergencyContact?: string;
    maritalStatus?: string;
    recruitmentDate?: string;
    contractEndDate?: string;
    idCardNumber?: string;
    passportNumber?: string;
    idExpiryDate?: string;
    insuranceNumber?: string;
    bankAccount?: string;
}
