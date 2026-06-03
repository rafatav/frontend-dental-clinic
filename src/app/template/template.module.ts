import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AppointmentsModule } from '../appointments/appointments.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DentistsModule } from '../dentists/dentists.module';
import { PatientsModule } from '../patients/patients.module';
import { SpecialtiesModule } from '../specialties/specialties.module';
import { UsersModule } from '../users/users.module';
import { ReportsModule } from '../reports/reports.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    AppointmentsModule,
    DashboardModule,
    DentistsModule,
    PatientsModule,
    ReportsModule,
    SpecialtiesModule,
    UsersModule
  ]
})
export class TemplateModule { }
