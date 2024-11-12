import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { UtilsService } from '../../../services/utils.service';
import { Horario } from '../../../models/horario';

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

  goBack() {
    this.back.emit();
  }

  ngOnInit(): void {
    this.generar_horarios();
    this.generarDias();
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
        ...this.util.generar_horarios(inicio - 1, fin, fin_minutos),
      ];
    }
  }

  seleccion_dia(item: Horario, hora: string) {
    item.hora_seleccionada = hora;
    this.dia_seleccionado.emit(item);
  }
}
