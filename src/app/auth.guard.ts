import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const loginService = inject(AuthService);

  const logged : boolean = loginService.isLoggedIn();

  if (logged) {
    return true;
  }

  router.navigate(['login']);

  return false;
};
