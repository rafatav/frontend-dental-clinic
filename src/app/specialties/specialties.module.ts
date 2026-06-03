import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialtiesRoutingModule } from './specialties-routing.module';
import { SpecialtyComponent } from './specialty/specialty.component';


@NgModule({
  declarations: [
    SpecialtyComponent
  ],
  imports: [
    CommonModule,
    SpecialtiesRoutingModule
  ]
})
export class SpecialtiesModule { }
