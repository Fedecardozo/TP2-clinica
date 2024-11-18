import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  async exportarExcelUsuario(datos: Usuario[]) {
    const workbook = new ExcelJS.Workbook(); // Crear el libro de trabajo
    const worksheet = workbook.addWorksheet('Datos'); // Crear una hoja de trabajo

    // Agregar encabezados
    worksheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 15 },
      { header: 'Apellido', key: 'apellido', width: 15 },
      { header: 'Rol', key: 'rol', width: 15 },
      { header: 'Edad', key: 'edad', width: 8 },
      { header: 'DNI', key: 'dni', width: 15 },
      { header: 'Correo', key: 'correo', width: 25 },
      { header: 'Estado', key: 'estado', width: 15 },
    ];

    // Agregar datos
    datos.forEach((item) => {
      const hab = item.habilitado ? 'Habilitado' : 'Inhabilitado';
      worksheet.addRow({
        nombre: item.nombre,
        apellido: item.apellido,
        rol: item.rol,
        edad: item.edad,
        dni: item.dni,
        correo: item.mail,
        estado: hab,
      });
    });

    // Estilizar la primera fila (encabezados)
    worksheet.getRow(1).font = { bold: true };

    // Exportar y guardar el archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, 'datos.xlsx');
  }
}
