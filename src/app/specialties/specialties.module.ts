import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialtiesRoutingModule } from './specialties-routing.module';
import { SpecialtyComponent } from './specialty/specialty.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SpecialtyDialogComponent } from './specialty-dialog/specialty-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    SpecialtyComponent,
    SpecialtyDialogComponent
  ],
  imports: [
    CommonModule,
    SpecialtiesRoutingModule, 
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class SpecialtiesModule { }
