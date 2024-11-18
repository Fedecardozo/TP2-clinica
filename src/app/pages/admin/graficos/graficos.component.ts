import { Component, inject } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { slideUpAnimation } from '../../../utils/animation';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../../../services/firebase.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [TitleCasePipe],
  animations: [slideUpAnimation],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css',
})
export class GraficosComponent {
  chart?: Chart;
  sub?: Subscription;
  fire = inject(FirebaseService);
  logs: any[] = [];
  th: string[] = [];

  constructor() {
    this.th = ['Correo', 'Nombre', 'Apellido', 'Fecha', 'Dia', 'Horario'];
  }

  ngOnInit(): void {
    this.getLogs();
    this.crearChart();
  }

  getLogs() {
    this.sub = this.fire
      .getCollection('logs')
      .valueChanges()
      .subscribe((next) => {
        console.log(next);
        this.logs = next;
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
          data: [65, 59, 80, 81, 56, 55, 40],
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
