import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentistsRoutingModule } from './dentists-routing.module';
import { DentistComponent } from './dentist/dentist.component';


@NgModule({
  declarations: [
    DentistComponent
  ],
  imports: [
    CommonModule,
    DentistsRoutingModule
  ]
})
export class DentistsModule { }
