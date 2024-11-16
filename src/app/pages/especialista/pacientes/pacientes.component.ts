import { Component, inject } from '@angular/core';
import { HistoriaClinicaComponent } from '../../../components/historia-clinica/historia-clinica.component';
import { AuthService } from '../../../services/auth.service';
import { slideUpAnimation } from '../../../utils/animation';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilsService } from '../../../services/utils.service';
import { PdfService } from '../../../services/pdf.service';
import { Subscription } from 'rxjs';
import { Turno } from '../../../models/turno';
import { Alert } from '../../../models/alert';
import { Usuario } from '../../../models/usuario';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [HistoriaClinicaComponent, TitleCasePipe, DatePipe],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css',
  animations: [slideUpAnimation],
})
export class PacientesComponent {
  user = inject(AuthService);
  fire = inject(FirebaseService);
  pdf = inject(PdfService);
  util = inject(UtilsService);
  sub?: Subscription;
  turnos: Turno[] = [];
  th: string[] = [];
  select: string[] = [];
  filtro = '';
  filtro_data: Turno[] = [];
  obj_isFadein: any;
  ids_pacientes: string[] = [];
  pacientes: Usuario[] = [];
  fechas: string[] = [];
  mostrarModal = false;
  id_paciente: string = '';

  constructor() {
    this.obj_isFadein = { isFadein: false };
    this.util.mostrarFadeIn(this.obj_isFadein);
    this.th = [
      'paciente',
      'especialidad',
      'especialista',
      'altura',
      'peso',
      'presion',
      'temperatura',
      'extra 1',
      'extra 2',
      'extra 3',
    ];

    this.select = ['Cardiologo', 'Dentista', 'Pediatra', 'Radiologo', 'Todos'];
  }

  ngOnInit(): void {
    this.sub = this.fire
      .getCollection('turnos')
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Turno[];
        this.turnos = aux.filter(
          (item) =>
            item.id_especialista === this.user.userActual?.id &&
            (item.estado === Turno.estado_realizado ||
              item.estado === Turno.estado_finalizado)
        );
        this.get_pacientes();

        // this.get_pacientes();
        // this.filtro_data = [...this.turnos];
        // this.pdf.datos = this.filtro_data;
        if (!this.turnos.length) Alert.info('No hay datos para mostrar');
      });
  }

  // Cargo el array de pacientes sin que se repita
  async get_pacientes() {
    this.turnos.forEach((item, indice) => {
      let flag = false;
      let index = indice + 1;

      for (index; index < this.turnos.length; index++) {
        const element = this.turnos[index];
        if (element.id_paciente === item.id_paciente) {
          flag = true;
        }
      }

      if (!flag) this.ids_pacientes.push(item.id_paciente);
    });

    //Cargo array
    this.ids_pacientes.forEach(async (id) => {
      await this.fire.getUser(id).forEach((data) => {
        const user = data.data() as Usuario;
        user.fechas_turnos = [];
        this.turnos.forEach((b) => {
          if (b.id_paciente === id) {
            user.fechas_turnos.push(b.fecha);
          }
        });
        this.pacientes.push(user);
      });
    });

    console.log(this.pacientes);
  }

  verHistoriaClinica(paciente: Usuario) {
    this.mostrarModal = true;
    this.id_paciente = paciente.id;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
