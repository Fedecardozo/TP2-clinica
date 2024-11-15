import { Component, inject } from '@angular/core';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { slideUpAnimation } from '../../utils/animation';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    RouterLink,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  animations: [slideUpAnimation],
})
export class RegistroComponent {
  auth = inject(AuthService);
  isAdmin = false;

  ngOnInit(): void {
    this.isAdmin = this.auth.rol === 'admin';
  }
}
