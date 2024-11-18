import { Component, Input } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { Turno } from '../../../../models/turno';
import { Alert } from '../../../../models/alert';

@Component({
  selector: 'app-medico-barra-finalizado',
  standalone: true,
  imports: [],
  templateUrl: './medico-barra-finalizado.component.html',
  styleUrl: './medico-barra-finalizado.component.css',
})
export class MedicoBarraFinalizadoComponent {
  chart?: Chart;
  @Input() turnos: Turno[] = [];
  especialista: string[] = [];
  cantidad: number[] = [];

  ngOnInit() {
    this.generarDatosChart();
    this.crearChart();
  }

  generarDatosChart(fecha1: Date | null = null, fecha2: Date | null = null) {
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

    if (fecha1 && fecha2) {
      //Cantidad turnos especialistas
      tur_especialistas.forEach((espe, index) => {
        this.turnos.forEach((item) => {
          const fecha = new Date(parseInt(item.fecha));

          if (
            item.id_especialista === espe.id_especialista &&
            item.estado === Turno.estado_realizado &&
            fecha > fecha1 &&
            fecha <= fecha2
          ) {
            this.cantidad[index]++;
          }
        });
      });
    } else {
      //Cantidad turnos especialistas
      tur_especialistas.forEach((espe, index) => {
        this.turnos.forEach((item) => {
          if (
            item.id_especialista === espe.id_especialista &&
            item.estado === Turno.estado_realizado
          ) {
            this.cantidad[index]++;
          }
        });
      });
    }
  }

  filtrar() {
    const fecha_inicial = document.getElementById(
      'fecha_inicial2'
    ) as HTMLInputElement;
    const fecha_final = document.getElementById(
      'fecha_final2'
    ) as HTMLInputElement;

    if (fecha_inicial.value && fecha_final.value) {
      const fecha_1 = new Date(fecha_inicial.value);
      const fecha_2 = new Date(fecha_final.value);
      this.especialista.splice(0, this.especialista.length);
      this.cantidad.splice(0, this.cantidad.length);

      this.generarDatosChart(fecha_1, fecha_2);
      this.crearChart();
    } else Alert.msjTimer('No cargo las fechas', 'error');
  }

  crearChart() {
    const canvas = document.getElementById('chart3') as HTMLCanvasElement;

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

    const data = {
      labels: this.especialista,
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
          borderWidth: 1,
        },
      ],
    };

    // Crear el gráfico
    this.chart = new Chart(ctx, {
      type: 'bar' as ChartType, // Tipo de gráfica
      data, // Datos
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
