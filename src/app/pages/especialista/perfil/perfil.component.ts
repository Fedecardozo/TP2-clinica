import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { TitleCasePipe } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilsService } from '../../../services/utils.service';
import { FormsModule } from '@angular/forms';
import { Alert } from '../../../models/alert';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [TitleCasePipe, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  user = inject(AuthService);
  fire = inject(FirebaseService);
  util = inject(UtilsService);
  decoration = 'm-3 text-primary text-decoration-underline';
  decoration2 = 'm-3 text-primary';
  perfil = true;
  horarioInicio: string[];
  horariosFin: string[];
  dias: string[];
  class: string[];
  clase = 'col-12 btn btn-outline-success mb-2';
  clase_select = 'col-12 btn btn-success mb-2';
  dias_seleccionado: string[] = [];
  seleccion_horario_inicio = '';
  seleccion_horario_fin = '';

  constructor() {
    this.dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    this.class = [
      this.clase,
      this.clase,
      this.clase,
      this.clase,
      this.clase,
      this.clase,
    ];
    this.horarioInicio = [...this.util.generar_horarios(7)];
    this.horariosFin = [...this.util.generar_horarios(7)];
    this.horarioInicio.pop();
    this.horariosFin.shift();
  }

  ngOnInit(): void {
    this.seleccion_horario_inicio =
      this.user.userActual?.horario_de_inicio || '';
    this.seleccion_horario_fin = this.user.userActual?.horario_de_fin || '';
    this.user.userActual?.dias_de_trabajo.forEach((item) => {
      this.seleccionarDia(item);
    });
  }

  clickDias() {
    if (this.perfil) {
      const aux = this.decoration;
      this.decoration = this.decoration2;
      this.decoration2 = aux;
      this.perfil = false;
    }
  }

  clickPefil() {
    if (!this.perfil) {
      const aux = this.decoration2;
      this.decoration2 = this.decoration;
      this.decoration = aux;
      this.perfil = true;
    }
  }

  seleccionarDia(item: string) {
    const index = this.dias.indexOf(item);
    if (this.class[index] === this.clase) {
      this.class[index] = this.clase_select;
      this.dias_seleccionado.push(item);
    } else {
      this.class[index] = this.clase;
      const indice = this.dias_seleccionado.indexOf(item);
      this.dias_seleccionado.splice(indice, indice + 1);
    }
  }

  guardar() {
    this.util.mostrarSpinner('Guardando cambios...');
    if (this.user?.userActual) {
      this.user.userActual.horario_de_inicio = this.seleccion_horario_inicio;
      this.user.userActual.horario_de_fin = this.seleccion_horario_fin;
      this.user.userActual.dias_de_trabajo = this.dias_seleccionado;
      this.fire
        .updateUsuario(this.user.userActual)
        .then(() => {
          Alert.exito('Se guardaron los cambios exitosamente!');
        })
        .catch(() => {
          Alert.error(
            'Hubo un error al guardar los cambios',
            'Intentelo más tarde...'
          );
        })
        .finally(() => {
          this.util.ocultarSpinner();
        });
    }
  }
}
