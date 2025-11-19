// System 4 - HR Management Models

// Awards
export interface Award {
  trackingId: string;
  awardName: string;
  awardType?: string;
  description?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface AwardRequest {
  awardName: string;
  awardType?: string;
  description?: string;
}

// BML Companies
export interface BMLCompany {
  trackingId: string;
  companyName: string;
  gradeName?: string;
  hierarchyLevel?: number;
  description?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface BMLCompanyRequest {
  companyName: string;
  gradeName?: string;
  hierarchyLevel?: number;
  description?: string;
}

// HR Functions
export interface HRFunction {
  trackingId: string;
  functionName: string;
  gradeName?: string;
  hierarchyLevel?: number;
  description?: string;
  department?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface HRFunctionRequest {
  functionName: string;
  gradeName?: string;
  hierarchyLevel?: number;
  description?: string;
  department?: string;
}

// HR Grades
export interface HRGrade {
  trackingId: string;
  gradeName: string;
  description?: string;
  hierarchyLevel?: number;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface HRGradeRequest {
  gradeName: string;
  description?: string;
  hierarchyLevel?: number;
}

// Service Positions
export interface ServicePosition {
  trackingId: string;
  positionName: string;
  positionType?: string;
  location?: string;
  unitTrackingId?: string;
  unitName?: string;
  description?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface ServicePositionRequest {
  positionName: string;
  positionType?: string;
  location?: string;
  unitTrackingId?: string;
  description?: string;
}

// Other Positions
export interface OtherPosition {
  trackingId: string;
  positionName: string;
  positionType?: string;
  description?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface OtherPositionRequest {
  positionName: string;
  positionType?: string;
  description?: string;
}

// Trainings
export interface Training {
  trackingId: string;
  trainingName: string;
  trainingType?: string;
  description?: string;
  institution?: string;
  country?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface TrainingRequest {
  trainingName: string;
  trainingType?: string;
  description?: string;
  institution?: string;
  country?: string;
}

// Agent Award History
export interface AgentAwardHistory {
  trackingId: string;
  agentTrackingId: string;
  agentName?: string;
  agentMatricule?: string;
  awardTrackingId: string;
  awardName?: string;
  awardDate: string;
  decisionReference?: string;
  motive?: string;
  remarks?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface AgentAwardHistoryRequest {
  agentTrackingId: string;
  awardTrackingId: string;
  awardDate: string;
  decisionReference?: string;
  motive?: string;
  remarks?: string;
}

// Agent Company History
export interface AgentCompanyHistory {
  trackingId: string;
  agentTrackingId: string;
  agentName?: string;
  agentMatricule?: string;
  companyTrackingId: string;
  companyName?: string;
  startDate: string;
  endDate?: string;
  decisionReference?: string;
  remarks?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface AgentCompanyHistoryRequest {
  agentTrackingId: string;
  companyTrackingId: string;
  startDate: string;
  endDate?: string;
  decisionReference?: string;
  remarks?: string;
}

// Agent Function History
export interface AgentFunctionHistory {
  trackingId: string;
  agentTrackingId: string;
  agentName?: string;
  agentMatricule?: string;
  functionTrackingId: string;
  functionName?: string;
  startDate: string;
  endDate?: string;
  decisionReference?: string;
  remarks?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface AgentFunctionHistoryRequest {
  agentTrackingId: string;
  functionTrackingId: string;
  startDate: string;
  endDate?: string;
  decisionReference?: string;
  remarks?: string;
}

// Agent Grade History
export interface AgentGradeHistory {
  trackingId: string;
  agentTrackingId: string;
  agentName?: string;
  agentMatricule?: string;
  gradeTrackingId: string;
  gradeName?: string;
  promotionDate: string;
  decisionReference?: string;
  remarks?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface AgentGradeHistoryRequest {
  agentTrackingId: string;
  gradeTrackingId: string;
  promotionDate: string;
  decisionReference?: string;
  remarks?: string;
}

// Agent Service Position History
export interface AgentServicePositionHistory {
  trackingId: string;
  agentTrackingId: string;
  agentName?: string;
  agentMatricule?: string;
  servicePositionTrackingId: string;
  positionName?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  decisionReference?: string;
  remarks?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface AgentServicePositionHistoryRequest {
  agentTrackingId: string;
  servicePositionTrackingId: string;
  startDate: string;
  endDate?: string;
  decisionReference?: string;
  remarks?: string;
}

// Agent Other Position History
export interface AgentOtherPositionHistory {
  trackingId: string;
  agentTrackingId: string;
  agentName?: string;
  agentMatricule?: string;
  otherPositionTrackingId: string;
  positionName?: string;
  positionType?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  remarks?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface AgentOtherPositionHistoryRequest {
  agentTrackingId: string;
  otherPositionTrackingId: string;
  startDate: string;
  endDate?: string;
  location?: string;
  remarks?: string;
}

// Agent Training History
export interface AgentTrainingHistory {
  trackingId: string;
  agentTrackingId: string;
  agentName?: string;
  agentMatricule?: string;
  trainingTrackingId: string;
  trainingName?: string;
  startDate: string;
  endDate?: string;
  diploma?: string;
  remarks?: string;
  createDate?: string;
  updateDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface AgentTrainingHistoryRequest {
  agentTrackingId: string;
  trainingTrackingId: string;
  startDate: string;
  endDate?: string;
  diploma?: string;
  remarks?: string;
}
