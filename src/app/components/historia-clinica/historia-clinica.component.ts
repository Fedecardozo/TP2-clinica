import { Component, inject, Input } from '@angular/core';
import { DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { Subscription } from 'rxjs';
import { Turno } from '../../models/turno';
import { Alert } from '../../models/alert';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';
import { fadeIn } from '../../utils/animation';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, JsonPipe, FormsModule],
  templateUrl: './historia-clinica.component.html',
  styleUrl: './historia-clinica.component.css',
  animations: [fadeIn],
})
export class HistoriaClinicaComponent {
  fire = inject(FirebaseService);
  pdf = inject(PdfService);
  util = inject(UtilsService);
  sub?: Subscription;
  turnos: Turno[] = [];
  th: string[] = [];
  select: string[] = [];
  @Input() id_paciente = '';
  @Input() id_especialista = '';
  filtro = '';
  filtro_data: Turno[] = [];
  obj_isFadein: any;

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
            (item.id_paciente === this.id_paciente ||
              item.id_especialista === this.id_especialista) &&
            (item.estado === Turno.estado_realizado ||
              item.estado === Turno.estado_finalizado)
        );

        this.filtro_data = [...this.turnos];
        this.pdf.datos = this.filtro_data;
        if (!this.turnos.length) Alert.info('No hay datos para mostrar');
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  seleccion(item: Event) {
    const selectElement = item.target as HTMLSelectElement;
    const select = selectElement.value.toLowerCase();

    if (select === 'todos') this.filtro_data = this.turnos;
    else
      this.filtro_data = this.turnos.filter(
        (value) => value.especialidad.toLowerCase() === select
      );

    this.pdf.datos = this.filtro_data;
  }

  filtrar() {
    const term = this.filtro.toLowerCase();
    this.filtro_data = this.turnos.filter(
      (item) =>
        item.especialidad.toLowerCase().includes(term) ||
        item.paciente.toLowerCase().includes(term) ||
        item.especialista.toLowerCase().includes(term) ||
        item.altura.toString().toLowerCase().includes(term) ||
        item.peso.toString().toLowerCase().includes(term) ||
        item.presion.toString().toLowerCase().includes(term) ||
        item.temperatura.toString().toLowerCase().includes(term)
    );

    this.pdf.datos = this.filtro_data;
  }
}
