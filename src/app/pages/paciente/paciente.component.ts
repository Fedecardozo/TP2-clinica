import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css',
})
export class PacienteComponent {}
