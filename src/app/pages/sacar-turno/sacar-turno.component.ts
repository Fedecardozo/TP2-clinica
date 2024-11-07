import { Component, inject, Input } from '@angular/core';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { EspecialistaComponent } from './especialista/especialista.component';
import { Usuario } from '../../models/usuario';
import { DiaComponent } from './dia/dia.component';
import { HorarioComponent } from './horario/horario.component';
import { Alert } from '../../models/alert';
import { FirebaseService } from '../../services/firebase.service';
import { Turno } from '../../models/turno';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sacar-turno',
  standalone: true,
  imports: [
    EspecialidadComponent,
    EspecialistaComponent,
    DiaComponent,
    HorarioComponent,
  ],
  templateUrl: './sacar-turno.component.html',
  styleUrl: './sacar-turno.component.css',
})
export class SacarTurnoComponent {
  user = inject(AuthService);
  fire = inject(FirebaseService);
  util = inject(UtilsService);
  router = inject(Router);
  contador = 0;
  especialidad = '';
  especialista?: Usuario;
  dia?: Date;
  horario: string = '';
  @Input() paciente?: Usuario = this.user.userActual;

  ngOnInit(): void {}

  addEspecialidad(especialidad: string) {
    this.contador++;
    this.especialidad = especialidad;
  }

  removeEspecialidad() {
    this.especialidad = '';
    this.router.navigateByUrl('/home');
  }

  addEspecialista(especialista: Usuario) {
    this.contador++;
    this.especialista = especialista;
  }

  removeEspecialista() {
    this.contador--;
    this.especialista = undefined;
  }

  addDia(dia: Date) {
    this.contador++;
    this.dia = dia;
  }

  removeDia() {
    this.contador--;
    this.dia = undefined;
  }

  removeHorario() {
    this.contador--;
    this.horario = '';
  }

  addHorario(hora: string) {
    this.horario = hora;
    Alert.question('¿Esta seguro de que quieres reservar este horario?').then(
      (res) => {
        if (res.isConfirmed) {
          this.util.mostrarSpinner('Cargando turno...');
          const turno = new Turno();
          turno.email_especialista = this.especialista?.mail ?? '';
          turno.especialidad = this.especialidad;
          turno.especialista =
            this.especialista?.nombre + ' ' + this.especialista?.apellido;
          turno.fecha = this.dia?.getTime().toString() ?? '';
          turno.hora = this.horario;
          turno.id_especialista = this.especialista?.id ?? '';
          turno.id_paciente = this.paciente?.id ?? '';
          turno.estado = Turno.estado_pediente;
          this.fire
            .addTurno(turno)
            .then(() => {
              Alert.exito('Se genero exitosamente su turno');
            })
            .catch(() => {
              Alert.error(
                'Hubo un error al cargar su turno',
                'Intentelo más tarde...'
              );
            })
            .finally(() => {
              this.util.ocultarSpinner();
            });
        }
      }
    );
  }
}
