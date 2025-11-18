import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgentsComponent } from './components/agents/agents.component';
import { UnitsComponent } from './components/units/units.component';
import { MissionsComponent } from './components/missions/missions.component';
import { AbsencesComponent } from './components/absences/absences.component';
import { ManagementRulesComponent } from './components/managementRules/management-rules.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AuthGuard } from './guards/auth.guard';
import { DutiesComponent } from './components/duties/duties.component';
import { HistoriesComponent } from './components/histories/histories.component';

// System 4 - HR Reference Data
import { HrGradesComponent } from './components/hr-grades/hr-grades.component';
import { HrFunctionsComponent } from './components/hr-functions/hr-functions.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { AwardsComponent } from './components/awards/awards.component';
import { ServicePositionsComponent } from './components/service-positions/service-positions.component';
import { OtherPositionsComponent } from './components/other-positions/other-positions.component';
import { BmlCompaniesComponent } from './components/bml-companies/bml-companies.component';

// System 4 - Agent History - Removed (consolidated in HistoriesComponent)

// System 3 - Maritime Operations
import { CommercialShipsComponent } from './components/commercial-ships/commercial-ships.component';
import { NavalVesselsComponent } from './components/naval-vessels/naval-vessels.component';
import { SecurityAgenciesComponent } from './components/security-agencies/security-agencies.component';
import { ArmedGuardMissionsComponent } from './components/armed-guard-missions/armed-guard-missions.component';
import { EscortMissionsComponent } from './components/escort-missions/escort-missions.component';
import { ShipArrivalDeparturesComponent } from './components/ship-arrival-departures/ship-arrival-departures.component';
import { PalEntryExitsComponent } from './components/pal-entry-exits/pal-entry-exits.component';
import { ShipIncidentsComponent } from './components/ship-incidents/ship-incidents.component';
import { ShipProvisioningsComponent } from './components/ship-provisionings/ship-provisionings.component';
import { StsOperationsComponent } from './components/sts-operations/sts-operations.component';
import { ConservatorSeizuresComponent } from './components/conservator-seizures/conservator-seizures.component';
import { PersonnelAllowancesComponent } from './components/personnel-allowances/personnel-allowances.component';

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

      // System 4 - Agent History - Removed (consolidated in HistoriesComponent)

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
