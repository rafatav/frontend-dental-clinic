import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { roleGuard } from '../role.guard';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'appointments',
        loadChildren: () => import('../appointments/appointments.module').then(m => m.AppointmentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'dentists',
        loadChildren: () => import('../dentists/dentists.module').then(m => m.DentistsModule)
      },
      {
        path: 'patients',
        loadChildren: () => import('../patients/patients.module').then(m => m.PatientsModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('../reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'specialties',
        loadChildren: () => import('../specialties/specialties.module').then(m => m.SpecialtiesModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
        canActivate: [authGuard, roleGuard],
        data: {
          expectedRole: 'ROLE_ADMIN'
        }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
