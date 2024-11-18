import { Component, inject } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { FirebaseService } from '../../../../services/firebase.service';
import { Turno } from '../../../../models/turno';

@Component({
  selector: 'app-barra',
  standalone: true,
  imports: [],
  templateUrl: './barra.component.html',
  styleUrl: './barra.component.css',
})
export class BarraComponent {
  chart?: Chart;
  fire = inject(FirebaseService);
  dias: number[] = [0, 0, 0, 0, 0, 0];

  async ngOnInit() {
    await this.obtenerTurnos();
    this.crearChart();
  }

  async obtenerTurnos() {
    await this.fire
      .getCollection('turnos')
      .get()
      .forEach((next) => {
        next.docs.forEach((item) => {
          const turno = item.data() as Turno;
          const fecha = new Date(parseInt(turno.fecha));
          const dia = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
          switch (dia) {
            case 'lunes':
              this.dias[0]++;
              break;
            case 'martes':
              this.dias[1]++;
              break;
            case 'miércoles':
              this.dias[2]++;
              break;
            case 'jueves':
              this.dias[3]++;
              break;
            case 'viernes':
              this.dias[4]++;
              break;
            case 'sábado':
              this.dias[5]++;
              break;
          }
        });
      });
  }

  crearChart() {
    const labels = [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];

    // datos
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Cantidad',
          data: this.dias,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };

    // Creamos la gráfica
    this.chart = new Chart('chart', {
      type: 'bar' as ChartType, // Tipo de gráfica
      data, // Datos
    });
  }
}
