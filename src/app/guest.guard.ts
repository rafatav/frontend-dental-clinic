import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const guestGuard: CanActivateFn = (route, state) => {

  const loginService = inject(AuthService);
  const router = inject(Router);

  const logged : boolean = loginService.isLoggedIn();

  if (logged) {
    router.navigate(['dashboard'])
  }

  return true;
};
