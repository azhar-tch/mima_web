// Énumérations basées sur le backend mima

export enum AbsenceType {
    SICK_LEAVE = 'SICK_LEAVE',
    ANNUAL_LEAVE = 'ANNUAL_LEAVE',
    MATERNITY_LEAVE = 'MATERNITY_LEAVE',
    PATERNITY_LEAVE = 'PATERNITY_LEAVE',
    UNPAID_LEAVE = 'UNPAID_LEAVE',
    SPECIAL_LEAVE = 'SPECIAL_LEAVE',
    TRAINING = 'TRAINING',
    FAMILY_EMERGENCY = 'FAMILY_EMERGENCY'
}

export enum AbsenceStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED'
}

export enum AgentStatus {
    AVAILABLE = 'AVAILABLE',
    ON_MISSION = 'ON_MISSION',
    ON_DUTY = 'ON_DUTY',
    RESTING = 'RESTING',
    ABSENT = 'ABSENT'
}

export enum MissionStatus {
    PLANNED = 'PLANNED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export enum DutyType {
    WATCH = 'WATCH',
    BRIDGE_WATCH = 'BRIDGE_WATCH',
    ENGINE_WATCH = 'ENGINE_WATCH',
    ANCHOR_WATCH = 'ANCHOR_WATCH',
    PORT_WATCH = 'PORT_WATCH',
    STANDBY = 'STANDBY'
}

export enum DutyStatus {
    PLANNED = 'PLANNED',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    REPLACED = 'REPLACED',
    CANCELLED = 'CANCELLED'
}

export enum UnitType {
    SHIP = 'SHIP',
    BASE = 'BASE',
    SERVICE = 'SERVICE'
}

export enum UnitStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum AlertStatus {
    NEW = 'NEW',
    RESOLVED = 'RESOLVED'
}

export enum ActionType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    VALIDATE = 'VALIDATE'
}
