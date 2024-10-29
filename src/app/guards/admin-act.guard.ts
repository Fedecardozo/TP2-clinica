import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminActGuard: CanActivateFn = (route, state) => {
  const user = inject(AuthService);
  return user.rol === 'admin';
};
