export interface DashboardStats {
    // Statistiques principales
    totalAgents: number;
    availableAgents: number;
    ongoingMissions: number;
    dutiesThisWeek: number;
    pendingAbsences: number;

    // Statistiques complémentaires
    newMissionsThisWeek: number;
    upcomingDutiesThisWeek: number;

    // Statistiques par statut d'agent
    agentsOnMission: number;
    agentsOnDuty: number;
    agentsResting: number;
    agentsAbsent: number;

    // Statistiques des missions
    plannedMissions: number;
    completedMissions: number;
    cancelledMissions: number;

    // Statistiques des absences
    approvedAbsences: number;
    rejectedAbsences: number;
}
