import { Component, inject } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { Alert } from '../../../models/alert';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Turno } from '../../../models/turno';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [TitleCasePipe, DatePipe],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css',
})
export class MisTurnosComponent {
  fire = inject(FirebaseService);
  auth = inject(AuthService);
  router = inject(Router);
  th: string[];
  sub?: Subscription;
  turnos: Turno[] = [];

  constructor() {
    this.th = Turno.keys();
    this.th.push('Acciones');
  }

  ngOnInit(): void {
    this.sub = this.fire
      .getCollection('turnos')
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Turno[];
        this.turnos = aux.filter(
          (item) => item.id_paciente === this.auth.userActual?.id
        );
        this.turnos.forEach((item) => {
          Turno.generarAcciones(item);
        });
      });
  }

  realizarEncuesta(turno: Turno) {
    Alert.encuesta('Realizar encuesta', 'Enviar', 'Cancelar').then((res) => {
      if (res.isConfirmed) {
        const { calificacion, comentario } = res.value;
        turno.reseña = comentario || 'No dejo motivos';
        turno.estado = Turno.estado_finalizado;
        turno.calificacion = calificacion;
        this.fire
          .updateTurno(turno)
          .then(() => {
            Alert.msjTimer('Se cargo la encuesta exitosamente!');
          })
          .catch(() => {
            Alert.msjTimer('Hubo un error cargar la encuesta', 'error');
          });
      }
    });
  }

  cancelar(turno: Turno) {
    Alert.input(
      'Si desea cancelar el turno justifique los motivos',
      'Cancelar turno',
      'Conservar turno'
    ).then((res) => {
      if (res.isConfirmed) {
        turno.reseña = res.value || 'No dejo motivos';
        turno.estado = Turno.estado_cancelado;
        this.fire
          .updateTurno(turno)
          .then(() => {
            Alert.msjTimer('Se cancelo el turno exitosamente!');
          })
          .catch(() => {
            Alert.msjTimer('Hubo un error al cancelar el turno', 'error');
          });
      }
    });
  }

  verResenia(turno: Turno) {
    const msj = `Comentario: ${turno.reseña}<br><br>${
      turno.calificacion
        ? 'Calificación: ' + turno.calificacion + ' puntos'
        : ''
    }`;
    let estado = '';

    if (turno.estado === Turno.estado_cancelado) estado = 'cancelación';
    else if (turno.estado == Turno.estado_rechazado) estado = 'rechazo';

    const reseña =
      turno.estado === Turno.estado_finalizado ||
      turno.estado === Turno.estado_realizado;

    const titulo = !reseña ? 'Motivo de ' + estado : 'Reseña';

    Alert.info(titulo, msj);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
