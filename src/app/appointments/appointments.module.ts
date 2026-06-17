import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentComponent } from './appointment/appointment.component'; 
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppointmentComponent,
    AppointmentDialogComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule, 
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatAutocompleteModule
  ]
})
export class AppointmentsModule { }
