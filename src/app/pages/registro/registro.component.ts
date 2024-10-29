import { Component, inject } from '@angular/core';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RegistroEspecialistaComponent, RegistroPacienteComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {}