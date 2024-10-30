import { Routes } from '@angular/router';
import { authActGuard } from './guards/auth-act.guard';
import { actAdminGuard } from './guards/act-admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./home/admin/admin.component').then((m) => m.AdminComponent),
      },
      {
        path: 'registro',
        loadComponent: () =>
          import(
            './pages/registro/registro-administrador/registro-administrador.component'
          ).then((m) => m.RegistroAdministradorComponent),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuarios/usuarios.component').then(
            (m) => m.UsuariosComponent
          ),
      },
    ],
    canActivate: [actAdminGuard],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [authActGuard],
  },
];
