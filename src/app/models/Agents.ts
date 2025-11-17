import { MarinerStatus, MaritimeRank, MaritimeSpecialty, VesselType } from './enums';
import { Units } from './Units';

export interface Agents {
    trackingId: string;
    registrationNo: string;
    firstName: string;
    lastName: string;

    // Informations maritimes
    maritimeRank: MaritimeRank;
    specialty: MaritimeSpecialty;
    seafarerBookNumber?: string;
    seamanLicenseNumber?: string;
    medicalCertificateExpiry?: string;
    maritimeQualifications?: string;
    qualifiedVesselType?: VesselType;
    yearsOfSeaExperience?: number;
    lastSeaDutyDate?: string;
    certifications?: string;

    unit?: Units;
    unitTrackingId?: string;
    unitName?: string;
    availability: boolean;
    status: MarinerStatus;
    createDate?: string;

    // Informations personnelles
    sex?: string;
    dateOfBirth?: string;
    email?: string;
    phoneNumber?: string;
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

    // Informations maritimes
    maritimeRank: MaritimeRank;
    specialty: MaritimeSpecialty;
    seafarerBookNumber?: string;
    seamanLicenseNumber?: string;
    medicalCertificateExpiry?: string;
    maritimeQualifications?: string;
    qualifiedVesselType?: VesselType;
    yearsOfSeaExperience?: number;
    lastSeaDutyDate?: string;
    certifications?: string;

    unitTrackingId: string;
    availability?: boolean;
    status?: MarinerStatus;

    // Informations personnelles
    sex?: string;
    dateOfBirth?: string;
    email?: string;
    phoneNumber?: string;
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

    // Informations maritimes
    maritimeRank: MaritimeRank;
    specialty: MaritimeSpecialty;
    seafarerBookNumber?: string;
    seamanLicenseNumber?: string;
    medicalCertificateExpiry?: string;
    maritimeQualifications?: string;
    qualifiedVesselType?: VesselType;
    yearsOfSeaExperience?: number;
    lastSeaDutyDate?: string;
    certifications?: string;

    unitName?: string;
    unitTrackingId?: string;
    availability: boolean;
    status: MarinerStatus;
    createDate?: string;

    // Informations personnelles
    sex?: string;
    dateOfBirth?: string;
    email?: string;
    phoneNumber?: string;
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
