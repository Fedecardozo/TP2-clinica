import { Component, inject, Input } from '@angular/core';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { EspecialistaComponent } from './especialista/especialista.component';
import { Usuario } from '../../models/usuario';
import { DiaComponent } from './dia/dia.component';
import { Alert } from '../../models/alert';
import { FirebaseService } from '../../services/firebase.service';
import { Turno } from '../../models/turno';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { PacienteComponent } from '../admin/paciente/paciente.component';
import { Horario } from '../../models/horario';

@Component({
  selector: 'app-sacar-turno',
  standalone: true,
  imports: [
    EspecialidadComponent,
    EspecialistaComponent,
    DiaComponent,
    PacienteComponent,
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
  dia_horario?: Horario;
  @Input() paciente?: Usuario = this.user.userActual;
  isTurnoHabilitado = true;

  ngOnInit(): void {}

  adminAddPaciente(paciente: Usuario) {
    this.paciente = paciente;
    this.isTurnoHabilitado = false;
  }

  addEspecialidad(especialidad: string) {
    this.contador++;
    this.especialidad = especialidad;
  }

  removeEspecialidad() {
    this.especialidad = '';
    if (this.user.rol === 'admin') {
      this.isTurnoHabilitado = true;
    } else this.router.navigateByUrl('/home');
  }

  addEspecialista(especialista: Usuario) {
    this.contador++;
    this.especialista = especialista;
  }

  removeEspecialista() {
    this.contador--;
    this.especialista = undefined;
  }

  removeDia() {
    this.contador--;
    this.dia_horario = undefined;
  }

  addDia(dia_horario: Horario) {
    this.contador++;
    Alert.question('¿Esta seguro de que quieres reservar este turno?').then(
      (res) => {
        if (res.isConfirmed) {
          this.util.mostrarSpinner('Cargando turno...');
          const turno = new Turno();
          turno.email_especialista = this.especialista?.mail ?? '';
          turno.especialidad = this.especialidad;
          turno.especialista =
            this.especialista?.nombre + ' ' + this.especialista?.apellido;
          turno.fecha = dia_horario.fecha?.getTime().toString() ?? '';
          turno.hora = dia_horario.hora_seleccionada;
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
