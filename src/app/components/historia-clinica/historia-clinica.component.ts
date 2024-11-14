import { Component, inject, Input } from '@angular/core';
import { DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { Subscription } from 'rxjs';
import { Turno } from '../../models/turno';
import { Alert } from '../../models/alert';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, JsonPipe, FormsModule],
  templateUrl: './historia-clinica.component.html',
  styleUrl: './historia-clinica.component.css',
})
export class HistoriaClinicaComponent {
  fire = inject(FirebaseService);
  pdf = inject(PdfService);
  sub?: Subscription;
  turnos: Turno[] = [];
  th: string[] = [];
  @Input() id_paciente = '';
  @Input() id_especialista = '';
  filtro = '';
  filtro_data: Turno[] = [];

  constructor() {
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

        // this.turnos.forEach((item: Turno) => {
        //   item.msjMap = [];
        //   for (const element of item.map) {
        //     const aux2 = element as any;
        //     // console.log(`${aux2.clave}: ${aux2.valor}`);
        //     item.msjMap.push(`${aux2.clave}: ${aux2.valor}`);
        //   }
        // });
        this.filtro_data = [...this.turnos];
        this.pdf.datos = [...this.filtro_data];
        if (!this.turnos.length) Alert.info('No hay datos para mostrar');
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
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
  }
}
