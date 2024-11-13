import { Component, inject, Input } from '@angular/core';
import { DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { Subscription } from 'rxjs';
import { Turno } from '../../models/turno';

@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, JsonPipe],
  templateUrl: './historia-clinica.component.html',
  styleUrl: './historia-clinica.component.css',
})
export class HistoriaClinicaComponent {
  fire = inject(FirebaseService);
  sub?: Subscription;
  turnos: Turno[] = [];
  th: string[] = [];
  @Input() id_paciente = '';

  constructor() {
    this.th = [
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
            (item.id_paciente === this.id_paciente &&
              item.estado === Turno.estado_realizado) ||
            item.estado === Turno.estado_finalizado
        );
        this.turnos.forEach((item: Turno) => {
          item.msjMap = [];
          for (const element of item.map) {
            const aux2 = element as any;
            // console.log(`${aux2.clave}: ${aux2.valor}`);
            item.msjMap.push(`${aux2.clave}: ${aux2.valor}`);
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
