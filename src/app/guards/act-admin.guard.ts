import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

export const actAdminGuard: CanActivateFn = (route, state) => {
  const user = inject(AuthService);
  const router = inject(Router);
  const rol = localStorage.getItem('rol') || '';

  if (rol !== 'admin') {
    user.rutearSegunRol(rol);
    return false;
  }

  return true;
};
