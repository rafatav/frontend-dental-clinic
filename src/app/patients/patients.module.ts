import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientComponent } from './patient/patient.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PatientsModule { }
