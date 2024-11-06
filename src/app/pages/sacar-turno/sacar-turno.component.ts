import { Component } from '@angular/core';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { EspecialistaComponent } from './especialista/especialista.component';
import { Usuario } from '../../models/usuario';
import { DiaComponent } from './dia/dia.component';

@Component({
  selector: 'app-sacar-turno',
  standalone: true,
  imports: [EspecialidadComponent, EspecialistaComponent, DiaComponent],
  templateUrl: './sacar-turno.component.html',
  styleUrl: './sacar-turno.component.css',
})
export class SacarTurnoComponent {
  contador = 0;
  especialidad = '';
  especialista?: Usuario;
  dia?: Date;

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

  addDia(dia: Date) {
    this.contador++;
    this.dia = dia;
    console.log(this.contador, ' ', dia);
  }
  removeDia() {
    this.contador--;
    this.dia = undefined;
  }
}
