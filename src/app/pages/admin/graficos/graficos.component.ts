import { Component, inject } from '@angular/core';
import { slideUpAnimation } from '../../../utils/animation';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../../../services/firebase.service';
import { TitleCasePipe } from '@angular/common';
import { BarraComponent } from './barra/barra.component';
import { LineComponent } from './line/line.component';
import { Turno } from '../../../models/turno';
import { MedicoBarraSolicitadoComponent } from './medico-barra-solicitado/medico-barra-solicitado.component';
import { MedicoBarraFinalizadoComponent } from './medico-barra-finalizado/medico-barra-finalizado.component';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [
    TitleCasePipe,
    BarraComponent,
    LineComponent,
    MedicoBarraSolicitadoComponent,
    MedicoBarraFinalizadoComponent,
  ],
  animations: [slideUpAnimation],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css',
})
export class GraficosComponent {
  sub?: Subscription;
  sub2?: Subscription;
  fire = inject(FirebaseService);
  logs: any[] = [];
  th: string[] = [];
  turnos: Turno[] = [];
  turnos_solicitados: any[] = [];
  turnos_finalizados: any[] = [];
  especialista: string[] = [];
  cantidad: number[] = [];

  constructor() {
    this.th = ['Correo', 'Nombre', 'Apellido', 'Fecha', 'Dia', 'Horario'];
  }

  async ngOnInit() {
    this.getLogs();
    await this.getTurnos();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
  }

  getLogs() {
    this.sub = this.fire
      .getCollection('logs')
      .valueChanges()
      .subscribe((next) => {
        this.logs = next;
      });
  }

  async getTurnos() {
    await this.fire
      .getCollection('turnos')
      .get()
      .forEach((next) => {
        next.docs.forEach((item) => {
          this.turnos.push(item.data() as Turno);
        });

        //Solo especialidades
        const tur_especialistas = this.turnos.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.id_especialista === item.id_especialista)
        );

        //Cargo especialistas
        tur_especialistas.forEach((item) => {
          this.especialista.push(item.especialista);
        });

        //Cargar cantidad
        tur_especialistas.forEach(() => {
          this.cantidad.push(0);
        });

        //Cantidad turnos especialistas
        tur_especialistas.forEach((espe, index) => {
          this.turnos.forEach((item) => {
            if (item.id_especialista === espe.id_especialista) {
              this.cantidad[index]++;
            }
          });
        });
      });
  }

  ngAfterViewChecked(): void {
    const scroll = document.getElementById('scroll');
    if (scroll !== null) {
      scroll.scrollTo({
        top: scroll.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
}
