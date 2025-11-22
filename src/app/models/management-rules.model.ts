/**
 * Modèles pour la gestion des règles de gestion du personnel
 */

export interface ManagementRules {
  trackingId: string;
  ruleName: string;
  preventDoubleAssignment: boolean;
  minRestHours: number;
  maxWeeklyHours: number;
  autoReportUnjustifiedAbsences: boolean;
  enforceEquityDistribution: boolean;
  description?: string;
  effectiveDate: string;
  createDate?: string;
  updateDate?: string;
}

export interface ManagementRulesRequest {
  ruleName: string;
  preventDoubleAssignment: boolean;
  minRestHours: number;
  maxWeeklyHours: number;
  autoReportUnjustifiedAbsences: boolean;
  enforceEquityDistribution: boolean;
  description?: string;
  effectiveDate: string;
}

export enum RuleType {
  DOUBLE_ASSIGNMENT = 'DOUBLE_ASSIGNMENT',
  INSUFFICIENT_REST = 'INSUFFICIENT_REST',
  WEEKLY_HOURS_EXCEEDED = 'WEEKLY_HOURS_EXCEEDED',
  UNJUSTIFIED_ABSENCE = 'UNJUSTIFIED_ABSENCE',
  EQUITY_DISTRIBUTION = 'EQUITY_DISTRIBUTION',
  GENERAL_VIOLATION = 'GENERAL_VIOLATION'
}

export enum SeverityLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL'
}

export enum AlertStatus {
  ACTIVE = 'ACTIVE',
  RESOLVED = 'RESOLVED',
  OVERRIDDEN = 'OVERRIDDEN',
  DISMISSED = 'DISMISSED'
}

export interface RuleViolation {
  ruleType: RuleType;
  severity: SeverityLevel;
  message: string;
  agentTrackingId: string;
  agentName: string;
  missionTrackingId?: string;
  detectionDate: string;
  details?: string;
  canBeOverridden: boolean;
}

export interface RuleViolationAlert {
  trackingId: string;
  ruleType: RuleType;
  severity: SeverityLevel;
  message: string;
  agent: {
    trackingId: string;
    firstName: string;
    lastName: string;
    registrationNo: string;
  };
  missionTrackingId?: string;
  details?: string;
  status: AlertStatus;
  canBeOverridden: boolean;
  resolvedDate?: string;
  resolvedBy?: {
    trackingId: string;
    username: string;
  };
  resolutionComment?: string;
  createDate: string;
  updateDate?: string;
}

export interface ValidationResult {
  violations: RuleViolation[];
  canProceed: boolean;
  warningsOnly: boolean;
}

export const RULE_TYPE_LABELS: Record<RuleType, string> = {
  [RuleType.DOUBLE_ASSIGNMENT]: 'Double affectation',
  [RuleType.INSUFFICIENT_REST]: 'Repos insuffisant',
  [RuleType.WEEKLY_HOURS_EXCEEDED]: 'Durée hebdomadaire dépassée',
  [RuleType.UNJUSTIFIED_ABSENCE]: 'Absence non justifiée',
  [RuleType.EQUITY_DISTRIBUTION]: 'Déséquilibre de répartition',
  [RuleType.GENERAL_VIOLATION]: 'Violation générale'
};

export const SEVERITY_LEVEL_LABELS: Record<SeverityLevel, string> = {
  [SeverityLevel.INFO]: 'Information',
  [SeverityLevel.WARNING]: 'Avertissement',
  [SeverityLevel.ERROR]: 'Erreur',
  [SeverityLevel.CRITICAL]: 'Critique'
};

export const SEVERITY_LEVEL_COLORS: Record<SeverityLevel, string> = {
  [SeverityLevel.INFO]: 'blue',
  [SeverityLevel.WARNING]: 'yellow',
  [SeverityLevel.ERROR]: 'orange',
  [SeverityLevel.CRITICAL]: 'red'
};

export const ALERT_STATUS_LABELS: Record<AlertStatus, string> = {
  [AlertStatus.ACTIVE]: 'Active',
  [AlertStatus.RESOLVED]: 'Résolue',
  [AlertStatus.OVERRIDDEN]: 'Annulée',
  [AlertStatus.DISMISSED]: 'Rejetée'
};
