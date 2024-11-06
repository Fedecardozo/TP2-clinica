import { Component } from '@angular/core';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { EspecialistaComponent } from './especialista/especialista.component';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-sacar-turno',
  standalone: true,
  imports: [EspecialidadComponent, EspecialistaComponent],
  templateUrl: './sacar-turno.component.html',
  styleUrl: './sacar-turno.component.css',
})
export class SacarTurnoComponent {
  contador = 0;
  especialidad = '';
  especialista?: Usuario;

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

  addEspecialista(especialista: Usuario) {
    this.contador++;
    this.especialista = especialista;
    console.log(this.contador, ' ', especialista);
  }
  removeEspecialista() {
    this.contador--;
    this.especialista = undefined;
  }
}
