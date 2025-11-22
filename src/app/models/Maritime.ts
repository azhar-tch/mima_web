// System 3 - Maritime / Commercial Ships Models
import { MissionStatus, NavalVesselType, NavalVesselStatus, EscortType, ShipStatus } from './enums';

// Commercial Ships
export interface CommercialShip {
  trackingId: string;
  imoNumber: string;
  shipName: string;
  shipType: string;
  flag: string;
  mmsi?: string;
  callSign?: string;
  grossTonnage?: number;
  deadWeight?: number;
  length?: number;
  width?: number;
  draft?: number;
  yearBuilt?: number;
  shipOwner?: string;
  operator?: string;
  lastPort?: string;
  nextPort?: string;
  cargoType?: string;
  arrivalDate?: string;
  departureDate?: string;
  status?: ShipStatus;
  observations?: string;
  isActive?: boolean;
  createDate?: string;
}

export interface CommercialShipRequest {
  imoNumber: string;
  shipName: string;
  shipType: string;
  flag: string;
  mmsi?: string;
  callSign?: string;
  grossTonnage?: number;
  deadWeight?: number;
  length?: number;
  width?: number;
  draft?: number;
  yearBuilt?: number;
  shipOwner?: string;
  operator?: string;
  lastPort?: string;
  nextPort?: string;
  cargoType?: string;
  arrivalDate?: string;
  departureDate?: string;
  status?: ShipStatus;
  observations?: string;
  isActive?: boolean;
}

// Naval Vessels
export interface NavalVessel {
  trackingId: string;
  vesselNumber: string;
  vesselType: NavalVesselType;
  vesselName: string;
  hullNumber?: string;
  yearCommissioned?: number;
  dateCommissioned?: string;
  dateDecommissioned?: string;
  length?: number;
  width?: number;
  draft?: number;
  displacement?: number;
  maxSpeed?: number;
  crewCapacity?: number;
  fuelCapacity?: number;
  range?: number;
  armament?: string;
  electronics?: string;
  engineType?: string;
  enginePower?: number;
  homePort?: string;
  operationalStatus?: NavalVesselStatus;
  currentLocation?: string;
  currentMission?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  totalOperationalHours?: number;
  observations?: string;
  isActive?: boolean;
  createDate?: string;
}

export interface NavalVesselRequest {
  vesselNumber: string;
  vesselType: NavalVesselType;
  vesselName: string;
  hullNumber?: string;
  yearCommissioned?: number;
  dateCommissioned?: string;
  dateDecommissioned?: string;
  length?: number;
  width?: number;
  draft?: number;
  displacement?: number;
  maxSpeed?: number;
  crewCapacity?: number;
  fuelCapacity?: number;
  range?: number;
  armament?: string;
  electronics?: string;
  engineType?: string;
  enginePower?: number;
  homePort?: string;
  operationalStatus?: NavalVesselStatus;
  currentLocation?: string;
  currentMission?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  totalOperationalHours?: number;
  observations?: string;
  isActive?: boolean;
}

// Security Agencies
export interface SecurityAgency {
  trackingId: string;
  agencyNumber: string;
  agencyName: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  contactPerson?: string;
  contactPosition?: string;
  registrationNumber?: string;
  licenseNumber?: string;
  website?: string;
  observations?: string;
  isActive?: boolean;
  totalEscortsRequested?: number;
  totalArmedGuardsRequested?: number;
  createDate?: string;
}

export interface SecurityAgencyRequest {
  agencyNumber: string;
  agencyName: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  contactPerson?: string;
  contactPosition?: string;
  registrationNumber?: string;
  licenseNumber?: string;
  website?: string;
  observations?: string;
  isActive?: boolean;
}

// Armed Guard Missions
export interface ArmedGuardMission {
  trackingId: string;
  missionNumber: string;
  commercialShipTrackingId: string;
  commercialShipName?: string;
  commercialShipImoNumber?: string;
  securityAgencyTrackingId: string;
  securityAgencyName?: string;
  securityAgencyNumber?: string;
  embarkationDate: string;
  disembarkationDate?: string;
  embarkationPort: string;
  disembarkationPort?: string;
  daysCount?: number;
  personnelCount?: number;
  durationInHours?: number;
  patrolZone?: string;
  status: MissionStatus;
  incidents?: string;
  observations?: string;
  createDate?: string;
}

export interface ArmedGuardMissionRequest {
  missionNumber: string;
  commercialShipTrackingId: string;
  securityAgencyTrackingId: string;
  embarkationDate: string;
  disembarkationDate?: string;
  embarkationPort: string;
  disembarkationPort?: string;
  daysCount?: number;
  personnelCount?: number;
  patrolZone?: string;
  status: MissionStatus;
  incidents?: string;
  observations?: string;
}

// Escort Missions
export interface EscortMission {
  trackingId: string;
  missionNumber: string;
  commercialShipTrackingId: string;
  commercialShipName?: string;
  commercialShipImoNumber?: string;
  securityAgencyTrackingId?: string;
  securityAgencyName?: string;
  securityAgencyNumber?: string;
  navalVesselTrackingId: string;
  navalVesselName?: string;
  navalVesselNumber?: string;
  commanderTrackingId?: string;
  commanderName?: string;
  commanderRank?: string;
  secondaryVesselTrackingId?: string;
  secondaryVesselName?: string;
  vedettes?: string;
  startDate: string;
  endDate?: string;
  durationInHours?: number;
  durationInDays?: number;
  escortType: EscortType;
  departurePoint: string;
  arrivalPoint?: string;
  distance?: number;
  escortZone?: string;
  status: MissionStatus;
  incidents?: string;
  observations?: string;
  createDate?: string;
}

export interface EscortMissionRequest {
  missionNumber: string;
  commercialShipTrackingId: string;
  securityAgencyTrackingId?: string;
  navalVesselTrackingId: string;
  commanderTrackingId?: string;
  secondaryVesselTrackingId?: string;
  vedettes?: string;
  startDate: string;
  endDate?: string;
  escortType: EscortType;
  departurePoint: string;
  arrivalPoint?: string;
  distance?: number;
  escortZone?: string;
  status: MissionStatus;
  incidents?: string;
  observations?: string;
}

// Personnel Allowances
export interface PersonnelAllowance {
  trackingId: string;
  rankCode: string;
  maritimeRank: string;
  escortDailyAllowance?: number;
  armedGuardDailyAllowance?: number;
  patrolAllowance?: number;
  riskAllowance?: number;
  seaAllowance?: number;
  currency?: string;
  observations?: string;
  isActive?: boolean;
  createDate?: string;
}

export interface PersonnelAllowanceRequest {
  rankCode: string;
  maritimeRank: string;
  escortDailyAllowance?: number;
  armedGuardDailyAllowance?: number;
  patrolAllowance?: number;
  riskAllowance?: number;
  seaAllowance?: number;
  currency?: string;
  observations?: string;
  isActive?: boolean;
}

// Ship Arrival/Departure
export interface ShipArrivalDeparture {
  trackingId: string;
  id?: number;
  commercialShipTrackingId: string;
  shipName?: string;
  imoNumber?: string;
  arrivalDate?: string;
  portOfOrigin?: string;
  cargoTypeArrival?: string;
  cargoQuantityArrival?: number;
  passengersArrival?: number;
  crewCount?: number;
  captainName?: string;
  shippingAgent?: string;
  berthingPosition?: string;
  departureDate?: string;
  portOfDestination?: string;
  cargoTypeDeparture?: string;
  cargoQuantityDeparture?: number;
  passengersDeparture?: number;
  stayDurationHours?: number;
  stayDurationDays?: number;
  servicesProvided?: string;
  portDues?: number;
  incidents?: string;
  observations?: string;
  createDate?: string;
}

export interface ShipArrivalDepartureRequest {
  commercialShipTrackingId: string;
  arrivalDate?: string;
  portOfOrigin?: string;
  cargoTypeArrival?: string;
  cargoQuantityArrival?: number;
  passengersArrival?: number;
  crewCount?: number;
  captainName?: string;
  shippingAgent?: string;
  berthingPosition?: string;
  departureDate?: string;
  portOfDestination?: string;
  cargoTypeDeparture?: string;
  cargoQuantityDeparture?: number;
  passengersDeparture?: number;
  servicesProvided?: string;
  portDues?: number;
  incidents?: string;
  observations?: string;
}

// PAL Entry/Exit
export interface PALEntryExit {
  trackingId: string;
  id?: number;
  commercialShipTrackingId: string;
  shipName?: string;
  imoNumber?: string;
  entryDate?: string;
  entryReason?: string;
  anchorageZone?: string;
  entryAuthorizationNumber?: string;
  authorizingAuthority?: string;
  exitDate?: string;
  exitReason?: string;
  exitAuthorizationNumber?: string;
  stayDurationHours?: number;
  stayDurationDays?: number;
  servicesProvided?: string;
  incidents?: string;
  observations?: string;
  createDate?: string;
}

export interface PALEntryExitRequest {
  commercialShipTrackingId: string;
  entryDate?: string;
  entryReason?: string;
  anchorageZone?: string;
  entryAuthorizationNumber?: string;
  authorizingAuthority?: string;
  exitDate?: string;
  exitReason?: string;
  exitAuthorizationNumber?: string;
  servicesProvided?: string;
  incidents?: string;
  observations?: string;
}

// Ship Incidents
export interface ShipIncident {
  trackingId: string;
  id?: number;
  commercialShipTrackingId: string;
  shipName?: string;
  imoNumber?: string;
  incidentDate: string;
  eventType?: string;
  incidentType?: string;
  severity?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  maritimeZone?: string;
  description?: string;
  causes?: string;
  casualties?: string;
  materialDamage?: string;
  pollutionOccurred?: boolean;
  pollutionType?: string;
  respondingAgencies?: string;
  assistingNavalVesselTrackingId?: string;
  assistingVesselName?: string;
  immediateMeasures?: string;
  resolutionDate?: string;
  resolutionDurationHours?: number;
  status?: string;
  isResolved?: boolean;
  reportEstablished?: boolean;
  reportReference?: string;
  notifiedAuthorities?: string;
  investigationOngoing?: boolean;
  recommendations?: string;
  observations?: string;
  createDate?: string;
}

export interface ShipIncidentRequest {
  commercialShipTrackingId: string;
  incidentDate: string;
  eventType?: string;
  incidentType?: string;
  severity?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  maritimeZone?: string;
  description?: string;
  causes?: string;
  casualties?: string;
  materialDamage?: string;
  pollutionOccurred?: boolean;
  pollutionType?: string;
  respondingAgencies?: string;
  assistingNavalVesselTrackingId?: string;
  immediateMeasures?: string;
  resolutionDate?: string;
  status?: string;
  isResolved?: boolean;
  reportEstablished?: boolean;
  reportReference?: string;
  notifiedAuthorities?: string;
  investigationOngoing?: boolean;
  recommendations?: string;
  observations?: string;
}

// Ship Provisioning
export interface ShipProvisioning {
  trackingId: string;
  id?: number;
  commercialShipTrackingId: string;
  shipName?: string;
  imoNumber?: string;
  provisioningDate: string;
  provisioningType?: string;
  supplierName?: string;
  supplyVesselName?: string;
  supplyVesselImo?: string;
  productType?: string;
  quantity?: number;
  unit?: string;
  amount?: number;
  startTime?: string;
  endTime?: string;
  operationDurationHours?: number;
  provisioningPoint?: string;
  hasDelay?: boolean;
  delayDurationHours?: number;
  delayReason?: string;
  delayPenalty?: number;
  correctiveActions?: string;
  isOnTime?: boolean;
  incidents?: string;
  observations?: string;
  createDate?: string;
}

export interface ShipProvisioningRequest {
  commercialShipTrackingId: string;
  provisioningDate: string;
  provisioningType?: string;
  supplierName?: string;
  supplyVesselName?: string;
  supplyVesselImo?: string;
  productType?: string;
  quantity?: number;
  unit?: string;
  amount?: number;
  startTime?: string;
  endTime?: string;
  provisioningPoint?: string;
  hasDelay?: boolean;
  delayDurationHours?: number;
  delayReason?: string;
  delayPenalty?: number;
  correctiveActions?: string;
  isOnTime?: boolean;
  incidents?: string;
  observations?: string;
}

// STS Operations
export interface STSOperation {
  trackingId: string;
  id?: number;
  operationNumber: string;
  motherVesselTrackingId?: string;
  motherVesselName?: string;
  motherVesselImo?: string;
  receivingVesselTrackingId?: string;
  receivingVesselName?: string;
  receivingVesselImo?: string;
  startDate: string;
  endDate?: string;
  operationDurationHours?: number;
  cargoType?: string;
  quantityTransferred?: number;
  unit?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  maritimeZone?: string;
  weatherConditions?: string;
  seaState?: number;
  stsOperator?: string;
  authorizationNumber?: string;
  authorizingAuthority?: string;
  supervisingNavalVesselTrackingId?: string;
  supervisingVesselName?: string;
  surveyCompany?: string;
  emergencyPlanEstablished?: boolean;
  pollutionPreventionEquipment?: string;
  incidents?: string;
  pollutionOccurred?: boolean;
  pollutionType?: string;
  incidentMeasures?: string;
  status?: string;
  isCompleted?: boolean;
  reportEstablished?: boolean;
  reportReference?: string;
  compliantWithStandards?: boolean;
  observations?: string;
  createDate?: string;
}

export interface STSOperationRequest {
  motherVesselTrackingId?: string;
  receivingVesselTrackingId?: string;
  startDate: string;
  endDate?: string;
  cargoType?: string;
  quantityTransferred?: number;
  unit?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  maritimeZone?: string;
  weatherConditions?: string;
  seaState?: number;
  stsOperator?: string;
  authorizationNumber?: string;
  authorizingAuthority?: string;
  supervisingNavalVesselTrackingId?: string;
  surveyCompany?: string;
  emergencyPlanEstablished?: boolean;
  pollutionPreventionEquipment?: string;
  incidents?: string;
  pollutionOccurred?: boolean;
  pollutionType?: string;
  incidentMeasures?: string;
  status?: string;
  isCompleted?: boolean;
  reportEstablished?: boolean;
  reportReference?: string;
  compliantWithStandards?: boolean;
  observations?: string;
}

// Conservator Seizures
export interface ConservatorSeizure {
  trackingId: string;
  id?: number;
  commercialShipTrackingId: string;
  shipName?: string;
  imoNumber?: string;
  seizureDate: string;
  seizingAuthority?: string;
  seizureOrderNumber?: string;
  seizureReason?: string;
  seizureType?: string;
  claimAmount?: number;
  seizureLocation?: string;
  creditorName?: string;
  creditorLegalRepresentative?: string;
  bailiffName?: string;
  shipGuardian?: string;
  releaseDate?: string;
  releaseReason?: string;
  releaseOrderNumber?: string;
  amountPaid?: number;
  seizureDurationHours?: number;
  seizureDurationDays?: number;
  status?: string;
  relatedDocuments?: string;
  observations?: string;
  createDate?: string;
}

export interface ConservatorSeizureRequest {
  commercialShipTrackingId: string;
  seizureDate: string;
  seizingAuthority?: string;
  seizureOrderNumber?: string;
  seizureReason?: string;
  seizureType?: string;
  claimAmount?: number;
  seizureLocation?: string;
  creditorName?: string;
  creditorLegalRepresentative?: string;
  bailiffName?: string;
  shipGuardian?: string;
  releaseDate?: string;
  releaseReason?: string;
  releaseOrderNumber?: string;
  amountPaid?: number;
  status?: string;
  relatedDocuments?: string;
  observations?: string;
}
