import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authActGuard: CanActivateFn = (route, state) => {
  const user = inject(AuthService);
  const router = inject(Router);
  if (user.correo) {
    router.navigateByUrl('/home');
  }

  return true;
};
