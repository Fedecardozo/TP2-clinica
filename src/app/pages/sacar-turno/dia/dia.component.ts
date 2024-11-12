import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { UtilsService } from '../../../services/utils.service';
import { Horario } from '../../../models/horario';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../../../services/firebase.service';
import { Turno } from '../../../models/turno';

@Component({
  selector: 'app-dia',
  standalone: true,
  imports: [TitleCasePipe, DatePipe],
  templateUrl: './dia.component.html',
  styleUrl: './dia.component.css',
})
export class DiaComponent {
  @Input() especialista?: Usuario;
  // fechas: Date[] = [];
  // dias: string[] = [];
  dia_horario: Horario[] = [];
  @Output() dia_seleccionado = new EventEmitter<Horario>();
  @Output() back = new EventEmitter<void>();
  util = inject(UtilsService);
  horarios: string[] = [];
  sub?: Subscription;
  fire = inject(FirebaseService);

  goBack() {
    this.back.emit();
  }

  ngOnInit(): void {
    this.generar_horarios();
    this.generarDias();
    this.filtrar_dia_horario();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  filtrar_dia_horario() {
    this.sub = this.fire
      .getCollection('turnos')
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Turno[];
        const turnos_especialiasta = aux.filter(
          (item) => item.id_especialista === this.especialista?.id
        );

        turnos_especialiasta.forEach((item) => {
          for (let index = 0; index < this.dia_horario.length; index++) {
            const element = this.dia_horario[index];
            //Obtengo la fecha que se genero ahora
            const fecha_actual = element.fecha.getTime().toString();
            //La formateo a un fecha legible
            const fecha_nueva = Horario.convertirFecha(fecha_actual);
            //Formateo la fecha reservada del especialista en legible
            const fecha_reservada = Horario.convertirFecha(item.fecha);
            //Saco del array los horarios y si es necesario la fecha
            if (fecha_nueva === fecha_reservada) {
              const indice_hora = element.horario.indexOf(item.hora);
              element.horario.splice(indice_hora, indice_hora + 1);
              //Saco la fecha si no tiene horarios para esa fecha
              if (!element.horario.length)
                this.dia_horario.splice(index, index + 1);
            }
          }
        });
      });
  }

  generarDias() {
    if (this.especialista) {
      const fechaActual = new Date();
      const opciones: Intl.DateTimeFormatOptions = { weekday: 'long' };

      for (let index = 1; index < 16; index++) {
        const fechaFutura = new Date(fechaActual);
        fechaFutura.setDate(fechaFutura.getDate() + index);
        const diaEnEspanol = fechaFutura.toLocaleDateString('es-ES', opciones);

        this.especialista.dias_de_trabajo.forEach((item) => {
          if (item === diaEnEspanol) {
            this.dia_horario.push(new Horario(fechaFutura, this.horarios));

            // this.fechas.push(fechaFutura);
            // this.dias.push(diaEnEspanol);
          }
        });
      }
    }
  }

  generar_horarios() {
    if (this.especialista) {
      const inicio = parseInt(
        this.especialista.horario_de_inicio.substring(0, 2)
      );
      const fin = parseInt(this.especialista.horario_de_fin.substring(0, 2));
      const fin_minutos =
        parseInt(this.especialista.horario_de_fin.substring(3, 5)) === 30
          ? 0
          : 30;

      this.horarios = [
        ...this.util.generar_horarios(inicio - 1, fin - 1, fin_minutos),
      ];
    }
  }

  seleccion_dia(item: Horario, hora: string) {
    item.hora_seleccionada = hora;
    this.dia_seleccionado.emit(item);
  }
}
