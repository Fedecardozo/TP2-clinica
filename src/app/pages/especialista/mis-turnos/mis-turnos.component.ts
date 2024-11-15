import { Component, inject } from '@angular/core';
import { Turno } from '../../../models/turno';
import { FirebaseService } from '../../../services/firebase.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { UtilsService } from '../../../services/utils.service';
import { Alert } from '../../../models/alert';
import { FormsModule } from '@angular/forms';
import { slideUpAnimation } from '../../../utils/animation';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, FormsModule],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css',
  animations: [slideUpAnimation],
})
export class MisTurnosComponent {
  fire = inject(FirebaseService);
  auth = inject(AuthService);
  util = inject(UtilsService);
  router = inject(Router);
  th: string[];
  sub?: Subscription;
  turnos: Turno[] = [];
  pacientes: Usuario[] = [];
  filtro = '';
  filtro_data: Turno[] = [];

  constructor() {
    this.th = Turno.keys_paciente();
  }

  ngOnInit(): void {
    this.sub = this.fire
      .getCollection('turnos')
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Turno[];
        this.turnos = aux.filter(
          (item) => item.id_especialista === this.auth.userActual?.id
        );
        this.turnos.forEach((item) => {
          Turno.generarAccionesEspecialista(item);
        });
        this.cargarPacientes();
        this.filtro_data = [...this.turnos];
      });
  }

  filtrar() {
    const term = this.filtro.toLowerCase();
    this.filtro_data = this.turnos.filter(
      (item) =>
        item.especialidad.toLowerCase().includes(term) ||
        item.paciente.toLowerCase().includes(term)
    );
  }

  async cargarPacientes() {
    this.turnos.forEach(async (item) => {
      await this.fire.getUser(item.id_paciente).forEach((next) => {
        const paciente = next.data() as Usuario;
        this.pacientes.push(paciente);
      });
    });
  }

  getNamePaciente(usuario: Usuario) {
    if (usuario) return `${usuario.nombre ?? ''} ${usuario.apellido ?? ''}`;
    else return '...';
  }

  cancelar(turno: Turno) {
    Alert.input(
      'Si desea cancelar el turno justifique los motivos',
      'Cancelar turno',
      'Conservar turno'
    ).then((res) => {
      if (res.isConfirmed) {
        turno.reseña_especialista = res.value || 'No dejo motivos';
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
    Turno.verResenia(turno);
  }

  rechazar(turno: Turno) {
    Alert.input(
      'Si desea rechazar el turno justifique los motivos',
      'Si, rechazar',
      'No, rechazar'
    ).then((res) => {
      if (res.isConfirmed) {
        turno.reseña_especialista = res.value || 'No dejo motivos';
        turno.estado = Turno.estado_rechazado;
        this.fire
          .updateTurno(turno)
          .then(() => {
            Alert.msjTimer('Se rechazo el turno exitosamente!');
          })
          .catch(() => {
            Alert.msjTimer('Hubo un error al rechazar el turno', 'error');
          });
      }
    });
  }

  finalizar(turno: Turno) {
    Alert.resenia_especialista().then((result) => {
      if (result.isConfirmed) {
        console.log('Datos ingresados:', result.value);
        const { altura, peso, presion, temperatura, extraFields, reseña } =
          result.value;

        turno.altura = altura;
        turno.peso = peso;
        turno.presion = presion;
        turno.temperatura = temperatura;
        turno.reseña_especialista = reseña || 'No dejo reseña';
        // turno.map = extraFields;
        turno.estado = Turno.estado_realizado;
        console.log(extraFields);

        for (const element of extraFields) {
          const aux2 = element as any;
          console.log(`${aux2.clave}: ${aux2.valor}`);
          turno.msjMap.push(`${aux2.clave}: ${aux2.valor}`);
        }
        this.fire
          .updateTurno(turno)
          .then(() => {
            Alert.msjTimer('Se finalizo el turno exitosamente!');
          })
          .catch(() => {
            Alert.msjTimer('Hubo un error al finalizar el turno', 'error');
          });
      }
    });
  }

  aceptar(turno: Turno) {
    Alert.question('¿Estas seguro de aceptar el turno?').then((res) => {
      if (res.isConfirmed) {
        turno.estado = Turno.estado_aceptado;
        this.fire
          .updateTurno(turno)
          .then(() => {
            Alert.msjTimer('Se acepto el turno');
          })
          .catch(() => {
            Alert.msjTimer('Hubo un error al aceptar el turno', 'error');
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
