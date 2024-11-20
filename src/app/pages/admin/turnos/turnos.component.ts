import { Component, inject } from '@angular/core';
import { Alert } from '../../../models/alert';
import { Turno } from '../../../models/turno';
import { Usuario } from '../../../models/usuario';
import { UtilsService } from '../../../services/utils.service';
import { AuthService } from '../../../services/auth.service';
import { FirebaseService } from '../../../services/firebase.service';
import { Subscription } from 'rxjs';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { slideUpAnimation } from '../../../utils/animation';
import { EstadoDirective } from '../../../directives/estado.directive';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, FormsModule, EstadoDirective],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css',
  animations: [slideUpAnimation],
})
export class TurnosComponent {
  fire = inject(FirebaseService);
  auth = inject(AuthService);
  util = inject(UtilsService);

  th: string[];
  sub?: Subscription;
  turnos: Turno[] = [];
  pacientes: Usuario[] = [];
  filtro = '';
  filtro_data: Turno[] = [];

  constructor() {
    this.th = Turno.keys_admin();
  }

  ngOnInit(): void {
    this.sub = this.fire
      .getCollection('turnos')
      .valueChanges()
      .subscribe((next) => {
        this.turnos = next as Turno[];
        this.turnos.forEach((item) => {
          if (item.estado === Turno.estado_pediente)
            item.acciones = ['Cancelar'];
          else item.acciones = [];
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
        item.especialista.toLowerCase().includes(term)
    );
  }

  verResenia(turno: Turno) {
    Turno.verResenia(turno);
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

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
