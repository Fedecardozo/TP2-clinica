import { Routes } from '@angular/router';
import { authActGuard } from './guards/auth-act.guard';
import { actAdminGuard } from './guards/act-admin.guard';

export const routes: Routes = [
  //solo entran los que no iniciaron sesion HOME
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [authActGuard],
  },

  //Admins
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

  //Registro
  {
    path: 'registro',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/registro/registro.component').then(
            (m) => m.RegistroComponent
          ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import(
            './pages/registro/registro-administrador/registro-administrador.component'
          ).then((m) => m.RegistroAdministradorComponent),
      },
      {
        path: 'especialista',
        loadComponent: () =>
          import(
            './pages/registro/registro-especialista/registro-especialista.component'
          ).then((m) => m.RegistroEspecialistaComponent),
      },
      {
        path: 'paciente',
        loadComponent: () =>
          import(
            './pages/registro/registro-paciente/registro-paciente.component'
          ).then((m) => m.RegistroPacienteComponent),
      },
    ],
  },

  //solo entran los que no iniciaron sesion LOGIN
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [authActGuard],
  },
];
