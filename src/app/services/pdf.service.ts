import { Injectable } from '@angular/core';
import { Turno } from '../models/turno';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  datos: Turno[] = [];

  constructor() {}

  exportToPDF(): void {
    const doc = new jsPDF();
    const logoBase64 = this.get_img_64();

    // Agregar logo y título
    doc.addImage(logoBase64, 'PNG', 80, 10, 50, 50); // Posición y tamaño del logo
    doc.setFontSize(16);
    const fecha = new Date();
    console.log(fecha.toLocaleDateString());
    doc.text('Fecha emisión: ' + fecha.toLocaleDateString(), 135, 10);
    doc.text('Historia Clínica', 85, 70);
    // Encabezado de la tabla
    const headers = [
      [
        'Paciente',
        'Especialidad',
        'Especialista',
        'Altura',
        'Peso',
        'Presión',
        'Temperatura',
        'Extra 1',
        'Extra 2',
        'Extra 3',
      ],
    ];
    const data = this.datos.map((item) => [
      item.paciente,
      item.especialidad,
      item.especialista,
      `${item.altura} cm`,
      `${item.peso} kg`,
      item.presion,
      `${item.temperatura} °C`,
      item.msjMap[0] || '----',
      item.msjMap[1] || '----',
      item.msjMap[2] || '----',
    ]);

    // Agregar tabla al PDF
    (doc as any).autoTable({
      head: headers,
      body: data,
      startY: 80,
      styles: { fontSize: 10 },
    });

    // Descarga el archivo PDF
    doc.save('historial_pacientes.pdf');
  }

  get_img_64() {
    return 'data:image/png;base64,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';
  }
}
