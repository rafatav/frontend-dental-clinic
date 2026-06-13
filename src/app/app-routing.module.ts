import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import { authGuard } from './auth.guard';
import { guestGuard } from './guest.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./template/template.module').then(m => m.TemplateModule),
    canActivate: [ authGuard ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ guestGuard ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [ authGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
