import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UtilsService } from './services/utils.service';
import { AuthService } from './services/auth.service';
import { NavAdminComponent } from './components/nav/nav-admin/nav-admin.component';
import { NavPacienteComponent } from './components/nav/nav-paciente/nav-paciente.component';
import { NavEspecialistaComponent } from './components/nav/nav-especialista/nav-especialista.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavAdminComponent,
    NavPacienteComponent,
    NavEspecialistaComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'clinica';
  util: UtilsService = inject(UtilsService);
  user: AuthService = inject(AuthService);

  constructor() {
    this.util.mostrarSpinner('Cargando...');
    setTimeout(() => {
      this.util.ocultarSpinner();
    }, 2500);
  }
}
