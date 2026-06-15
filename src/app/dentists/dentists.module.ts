import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentistsRoutingModule } from './dentists-routing.module';
import { DentistComponent } from './dentist/dentist.component'; 
import { DentistDialogComponent } from './dentist-dialog/dentist-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DentistComponent,
    DentistDialogComponent
  ],
  imports: [
    CommonModule,
    DentistsRoutingModule, 
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class DentistsModule { }