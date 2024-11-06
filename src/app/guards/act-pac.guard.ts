import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Rol } from '../models/rol';

export const actPacGuard: CanActivateFn = (route, state) => {
  const user = inject(AuthService);
  const router = inject(Router);
  const rol = localStorage.getItem('rol') || '';

  if (rol !== Rol.paciente) {
    user.rutearSegunRol(rol);
    return false;
  }

  return true;
};