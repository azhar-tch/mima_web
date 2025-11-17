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
      }
    ]
  },
  
  // Redirect unknown routes to dashboard
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
