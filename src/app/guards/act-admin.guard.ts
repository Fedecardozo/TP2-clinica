import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const actAdminGuard: CanActivateFn = (route, state) => {
  const user = inject(AuthService);
  const router = inject(Router);
  console.log(user.rol || 'vacio');
  if (user.rol !== 'admin') {
    router.navigateByUrl('/home');
    return false;
  }

  return true;
};
