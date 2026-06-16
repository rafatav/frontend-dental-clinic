import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component'; 
import { UserDialogComponent } from './user-dialog/user-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule, 
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class UsersModule { }
