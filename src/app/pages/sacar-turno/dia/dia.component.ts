import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dia',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './dia.component.html',
  styleUrl: './dia.component.css',
})
export class DiaComponent {
  @Input() especialista?: Usuario;
  fechas: Date[] = [];
  dias: string[] = [];
  @Output() dia_seleccionado = new EventEmitter<Date>();
  @Output() back = new EventEmitter<void>();

  goBack() {
    this.back.emit();
  }

  ngOnInit(): void {
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
            this.fechas.push(fechaFutura);
            this.dias.push(diaEnEspanol);
          }
        });
      }
    }
  }

  seleccion_dia(item: Date) {
    this.dia_seleccionado.emit(item);
  }
}
