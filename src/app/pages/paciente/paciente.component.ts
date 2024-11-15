import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { slideUpAnimation } from '../../utils/animation';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css',
  animations: [slideUpAnimation],
})
export class PacienteComponent {}
