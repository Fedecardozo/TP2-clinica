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
  util = inject(UtilsService);

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

      console.log(this.util.generar_horarios(inicio - 1, fin, fin_minutos));
    }
  }
}
