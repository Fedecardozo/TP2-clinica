import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Usuario } from '../../models/usuario';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Alert } from '../../models/alert';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Rol } from '../../models/rol';
import { HistoriaClinicaComponent } from '../../components/historia-clinica/historia-clinica.component';
import { fadeIn, slideUpAnimation } from '../../utils/animation';
import { UtilsService } from '../../services/utils.service';
import { ExcelService } from '../../services/excel.service';
import { Turno } from '../../models/turno';
import { DniPipe } from '../../pipes/dni.pipe';
import { EdadPipe } from '../../pipes/edad.pipe';
import { EstadoPipe } from '../../pipes/estado.pipe';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    TitleCasePipe,
    RouterLink,
    HistoriaClinicaComponent,
    DatePipe,
    DniPipe,
    EdadPipe,
    EstadoPipe,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  animations: [slideUpAnimation, fadeIn],
})
export class UsuariosComponent {
  fire = inject(FirebaseService);
  auth = inject(AuthService);
  util = inject(UtilsService);
  excel = inject(ExcelService);
  router = inject(Router);
  th: string[] = Usuario.getAtributosEspecialista();
  sub?: Subscription;
  usuarios: Usuario[] = [];
  especialistas: Usuario[] = [];
  pacientes: Usuario[] = [];
  admins: Usuario[] = [];
  list_todos: Usuario[] = [];
  paciente: boolean = false;
  especialista: boolean = true;
  admin: boolean = false;
  todos: boolean = false;
  decoration = 'm-3 text-primary text-decoration-underline';
  decorationAux = 'm-3 text-primary';
  decoration1 = this.decoration;
  decoration2 = this.decorationAux;
  decoration3 = this.decorationAux;
  decoration4 = this.decorationAux;
  mostrarHistorial = false;
  id_user = '';

  obj_isFadein: any;

  constructor() {
    this.obj_isFadein = { isFadein: false };
    this.util.mostrarFadeIn(this.obj_isFadein);
  }

  ngOnInit(): void {
    this.sub = this.fire
      .getCollection()
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Usuario[];
        this.especialistas = aux.filter(
          (item) => item.rol === Rol.especialista
        );
        this.list_todos = [...aux];
        this.usuarios = [...this.especialistas];
        this.admins = aux.filter((item) => item.rol === Rol.admin);
        this.pacientes = aux.filter((item) => item.rol === Rol.paciente);
      });
  }

  seleccion(especialista: Usuario) {
    const isHabilitado = especialista.habilitado;
    const text = isHabilitado ? 'inhabilitar' : 'habilitar';
    Alert.question(`¿Desesa ${text} a este especialista?`).then((res) => {
      if (res.isConfirmed) {
        especialista.habilitado = !isHabilitado;
        this.fire.updateUser(especialista);
      }
    });
  }

  click(num: number) {
    this.obj_isFadein = { isFadein: false };
    switch (num) {
      case 1:
        this.util.mostrarFadeIn(this.obj_isFadein);
        this.especialista = true;
        this.paciente = false;
        this.admin = false;
        this.todos = false;
        this.decoration1 = this.decoration;
        this.decoration2 = this.decorationAux;
        this.decoration3 = this.decorationAux;
        this.decoration4 = this.decorationAux;
        this.usuarios = [...this.especialistas];
        break;

      case 2:
        this.util.mostrarFadeIn(this.obj_isFadein);

        this.especialista = false;
        this.paciente = true;
        this.admin = false;
        this.todos = false;
        this.decoration1 = this.decorationAux;
        this.decoration2 = this.decoration;
        this.decoration3 = this.decorationAux;
        this.decoration4 = this.decorationAux;
        this.usuarios = [...this.pacientes];
        break;

      case 3:
        this.util.mostrarFadeIn(this.obj_isFadein);

        this.especialista = false;
        this.paciente = false;
        this.todos = false;
        this.admin = true;
        this.decoration1 = this.decorationAux;
        this.decoration2 = this.decorationAux;
        this.decoration3 = this.decoration;
        this.decoration4 = this.decorationAux;
        this.usuarios = [...this.admins];
        break;

      case 4:
        this.util.mostrarFadeIn(this.obj_isFadein);

        this.especialista = false;
        this.paciente = false;
        this.admin = false;
        this.todos = true;
        this.decoration1 = this.decorationAux;
        this.decoration2 = this.decorationAux;
        this.decoration3 = this.decorationAux;
        this.decoration4 = this.decoration;
        this.usuarios = [...this.list_todos];
        break;
    }
  }

  verHistoria(user: Usuario) {
    this.mostrarHistorial = true;
    this.id_user = user.id;
  }

  descargarExcel() {
    this.excel
      .exportarExcelUsuario(this.list_todos)
      .then(() => {
        Alert.msjTimer('Se descargo con exito!');
      })
      .catch(() => {
        Alert.msjTimer('Hubo un error al descargar el excel!', 'error');
      });
  }

  async descargarTurnos(user: Usuario) {
    const turnos_pac: Turno[] = [];
    await this.fire
      .getCollection('turnos')
      .get()
      .forEach((next) => {
        next.docs.forEach((item) => {
          const turno = item.data() as Turno;
          if (turno.id_paciente === user.id) turnos_pac.push(turno);
        });
      });

    this.excel
      .exportarExcelTurnos(turnos_pac)
      .then(() => {
        Alert.msjTimer('Se descargo con exito!');
      })
      .catch(() => {
        Alert.msjTimer('Hubo un error al descargar el excel!', 'error');
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
