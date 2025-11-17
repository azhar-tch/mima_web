export interface ManagementRules {
    trackingId: string;
    ruleName: string;

    // Règle 1: Aucune double affectation possible sur deux postes simultanés
    preventDoubleAssignment: boolean;

    // Règle 2: Repos minimal obligatoire entre deux gardes ou missions (en heures)
    minRestHours: number;

    // Règle 3: Durée maximale hebdomadaire de service à ne pas dépasser (en heures)
    maxWeeklyHours: number;

    // Règle 4: Les absences non justifiées sont automatiquement signalées
    autoReportUnjustifiedAbsences: boolean;

    // Règle 5: L'équité de répartition doit être respectée à chaque période
    enforceEquityDistribution: boolean;

    // Métadonnées
    description?: string;
    effectiveDate: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ManagementRulesRequest {
    ruleName: string;
    preventDoubleAssignment: boolean;
    minRestHours: number;
    maxWeeklyHours: number;
    autoReportUnjustifiedAbsences: boolean;
    enforceEquityDistribution: boolean;
    description?: string;
    effectiveDate?: string;
}

export interface ManagementRulesResponse {
    trackingId: string;
    ruleName: string;

    // Règle 1: Aucune double affectation possible sur deux postes simultanés
    preventDoubleAssignment: boolean;

    // Règle 2: Repos minimal obligatoire entre deux gardes ou missions (en heures)
    minRestHours: number;

    // Règle 3: Durée maximale hebdomadaire de service à ne pas dépasser (en heures)
    maxWeeklyHours: number;

    // Règle 4: Les absences non justifiées sont automatiquement signalées
    autoReportUnjustifiedAbsences: boolean;

    // Règle 5: L'équité de répartition doit être respectée à chaque période
    enforceEquityDistribution: boolean;

    // Métadonnées
    description?: string;
    effectiveDate: string;
    createDate?: string;
    updateDate?: string;
}
