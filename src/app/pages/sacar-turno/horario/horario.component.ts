import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css',
})
export class HorarioComponent {
  @Input() especialista?: Usuario;
  @Output() horario_seleccionado = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();
  util = inject(UtilsService);
  horarios: string[] = [];

  goBack() {
    this.back.emit();
  }

  ngOnInit(): void {
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

  seleccion_horario(item: string) {
    this.horario_seleccionado.emit(item);
  }
}
