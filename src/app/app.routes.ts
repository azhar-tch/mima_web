import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgentsComponent } from './agents/agents.component';
import { UnitsComponent } from './units/units.component';
import { MissionsComponent } from './missions/missions.component';
import { AbsencesComponent } from './absences/absences.component';
import { ManagementRulesComponent } from './managementRules/management-rules.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuard } from './guards/auth.guard';
import { DutiesComponent } from './components/duties/duties.component';
import { HistoriesComponent } from './components/histories/histories.component';

// System 4 - HR Reference Data
import { HrGradesComponent } from './hr-grades/hr-grades.component';
import { HrFunctionsComponent } from './hr-functions/hr-functions.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { AwardsComponent } from './awards/awards.component';
import { ServicePositionsComponent } from './service-positions/service-positions.component';
import { OtherPositionsComponent } from './other-positions/other-positions.component';
import { BmlCompaniesComponent } from './bml-companies/bml-companies.component';

// System 4 - Agent History
import { AgentGradeHistoryComponent } from './agent-grade-history/agent-grade-history.component';
import { AgentTrainingHistoryComponent } from './agent-training-history/agent-training-history.component';
import { AgentAwardHistoryComponent } from './agent-award-history/agent-award-history.component';
import { AgentFunctionHistoryComponent } from './agent-function-history/agent-function-history.component';
import { AgentCompanyHistoryComponent } from './agent-company-history/agent-company-history.component';
import { AgentServicePositionHistoryComponent } from './agent-service-position-history/agent-service-position-history.component';
import { AgentOtherPositionHistoryComponent } from './agent-other-position-history/agent-other-position-history.component';

// System 3 - Maritime Operations
import { CommercialShipsComponent } from './commercial-ships/commercial-ships.component';
import { NavalVesselsComponent } from './naval-vessels/naval-vessels.component';
import { SecurityAgenciesComponent } from './security-agencies/security-agencies.component';
import { ArmedGuardMissionsComponent } from './armed-guard-missions/armed-guard-missions.component';
import { EscortMissionsComponent } from './escort-missions/escort-missions.component';
import { ShipArrivalDeparturesComponent } from './ship-arrival-departures/ship-arrival-departures.component';
import { PalEntryExitsComponent } from './pal-entry-exits/pal-entry-exits.component';
import { ShipIncidentsComponent } from './ship-incidents/ship-incidents.component';
import { ShipProvisioningsComponent } from './ship-provisionings/ship-provisionings.component';
import { StsOperationsComponent } from './sts-operations/sts-operations.component';
import { ConservatorSeizuresComponent } from './conservator-seizures/conservator-seizures.component';
import { PersonnelAllowancesComponent } from './personnel-allowances/personnel-allowances.component';

export const routes: Routes = [
  // Auth routes (no layout)
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  // Main app routes (with layout) - Protected by AuthGuard
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'agents',
        component: AgentsComponent
      },
      {
        path: 'units',
        component: UnitsComponent
      },
      {
        path: 'missions',
        component: MissionsComponent
      },
      {
        path: 'absences',
        component: AbsencesComponent
      },
      {
        path: 'managementRules',
        component: ManagementRulesComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'profil',
        component: ProfilComponent
      },
      {
        path: 'duties',
        component: DutiesComponent
      },
      {
        path: 'histories',
        component: HistoriesComponent
      },

      // System 4 - HR Reference Data
      { path: 'hr-grades', component: HrGradesComponent },
      { path: 'hr-functions', component: HrFunctionsComponent },
      { path: 'trainings', component: TrainingsComponent },
      { path: 'awards', component: AwardsComponent },
      { path: 'service-positions', component: ServicePositionsComponent },
      { path: 'other-positions', component: OtherPositionsComponent },
      { path: 'bml-companies', component: BmlCompaniesComponent },

      // System 4 - Agent History
      { path: 'agent-grade-history', component: AgentGradeHistoryComponent },
      { path: 'agent-training-history', component: AgentTrainingHistoryComponent },
      { path: 'agent-award-history', component: AgentAwardHistoryComponent },
      { path: 'agent-function-history', component: AgentFunctionHistoryComponent },
      { path: 'agent-company-history', component: AgentCompanyHistoryComponent },
      { path: 'agent-service-position-history', component: AgentServicePositionHistoryComponent },
      { path: 'agent-other-position-history', component: AgentOtherPositionHistoryComponent },

      // System 3 - Maritime Operations
      { path: 'commercial-ships', component: CommercialShipsComponent },
      { path: 'naval-vessels', component: NavalVesselsComponent },
      { path: 'security-agencies', component: SecurityAgenciesComponent },
      { path: 'armed-guard-missions', component: ArmedGuardMissionsComponent },
      { path: 'escort-missions', component: EscortMissionsComponent },
      { path: 'ship-arrival-departures', component: ShipArrivalDeparturesComponent },
      { path: 'pal-entry-exits', component: PalEntryExitsComponent },
      { path: 'ship-incidents', component: ShipIncidentsComponent },
      { path: 'ship-provisionings', component: ShipProvisioningsComponent },
      { path: 'sts-operations', component: StsOperationsComponent },
      { path: 'conservator-seizures', component: ConservatorSeizuresComponent },
      { path: 'personnel-allowances', component: PersonnelAllowancesComponent }
    ]
  },
  
  // Redirect unknown routes to dashboard
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
