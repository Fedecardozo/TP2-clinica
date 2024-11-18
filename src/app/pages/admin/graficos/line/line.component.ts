import { Component, inject } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { Turno } from '../../../../models/turno';
import { FirebaseService } from '../../../../services/firebase.service';
import { Usuario } from '../../../../models/usuario';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [],
  templateUrl: './line.component.html',
  styleUrl: './line.component.css',
})
export class LineComponent {
  chart?: Chart;
  fire = inject(FirebaseService);
  tur_especialistas: Turno[] = [];
  especialidad: string[] = [];
  cantidad: number[] = [];

  async ngOnInit() {
    await this.obtenerTurnos();
    this.crearChart();
  }

  async obtenerTurnos() {
    const turnos: Turno[] = [];

    await this.fire
      .getCollection('turnos')
      .get()
      .forEach((next) => {
        next.docs.forEach((item) => {
          const turno = item.data() as Turno;
          turnos.push(turno);
        });
      });

    //Solo especialidades
    this.tur_especialistas = turnos.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.especialidad === item.especialidad)
    );

    //Cargo especialidad
    this.tur_especialistas.forEach((item) => {
      this.especialidad.push(item.especialidad);
    });

    //Cargar cantidad
    this.tur_especialistas.forEach(() => {
      this.cantidad.push(0);
    });

    //Cantidad turnos especialidad
    this.tur_especialistas.forEach((espe, index) => {
      turnos.forEach((item) => {
        if (item.especialidad === espe.especialidad) {
          this.cantidad[index]++;
        }
      });
    });

    console.log(this.cantidad);
  }

  crearChart() {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;

    if (!canvas) {
      console.error('Canvas element not found!');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context!');
      return;
    }

    // Destruye la instancia previa si existe
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.especialidad;

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Cantidad',
          data: this.cantidad,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          hoverOffset: 4,
        },
      ],
    };

    // Crear el gráfico
    this.chart = new Chart(ctx, {
      type: 'line' as ChartType, // Tipo de gráfica
      data, // Datos
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
