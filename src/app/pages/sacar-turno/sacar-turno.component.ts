import { Component } from '@angular/core';
import { EspecialidadComponent } from './especialidad/especialidad.component';

@Component({
  selector: 'app-sacar-turno',
  standalone: true,
  imports: [EspecialidadComponent],
  templateUrl: './sacar-turno.component.html',
  styleUrl: './sacar-turno.component.css',
})
export class SacarTurnoComponent {
  contador = 0;
  especialidad = '';

  ngOnInit(): void {}

  addEspecialidad(especialidad: string) {
    this.contador++;
    this.especialidad = especialidad;
    console.log(this.contador, ' ', especialidad);
  }
  removeEspecialidad() {
    this.contador--;
    this.especialidad = '';
  }
}
