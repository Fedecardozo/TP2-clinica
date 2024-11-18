import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Usuario } from '../models/usuario';
import { Turno } from '../models/turno';

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

  async exportarExcelTurnos(datos: Turno[]) {
    const workbook = new ExcelJS.Workbook(); // Crear el libro de trabajo
    const worksheet = workbook.addWorksheet('Datos'); // Crear una hoja de trabajo

    // Agregar encabezados
    worksheet.columns = [
      { header: 'Paciente', key: 'paciente', width: 30 },
      { header: 'Especialista', key: 'especialista', width: 30 },
      { header: 'Especialidad', key: 'especialidad', width: 30 },
      { header: 'Fecha', key: 'fecha', width: 15 },
      { header: 'Horario', key: 'horario', width: 10 },
      { header: 'Estado', key: 'estado', width: 15 },
    ];

    // Agregar datos
    datos.forEach((item) => {
      const fecha = new Date(parseInt(item.fecha)).toLocaleDateString();
      worksheet.addRow({
        paciente: item.paciente,
        especialista: item.especialista,
        especialidad: item.especialidad,
        fecha: fecha,
        horario: item.hora,
        estado: item.estado,
      });
    });

    // Estilizar la primera fila (encabezados)
    worksheet.getRow(1).font = { bold: true };

    // Exportar y guardar el archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, 'datos.xlsx');
  }

  async exportarExcelLogs(datos: any[]) {
    const workbook = new ExcelJS.Workbook(); // Crear el libro de trabajo
    const worksheet = workbook.addWorksheet('Datos'); // Crear una hoja de trabajo

    // Agregar encabezados
    worksheet.columns = [
      { header: 'Correo', key: 'correo', width: 30 },
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Apellido', key: 'apellido', width: 30 },
      { header: 'Fecha', key: 'fecha', width: 15 },
      { header: 'Dia', key: 'dia', width: 15 },
      { header: 'Horario', key: 'horario', width: 15 },
    ];

    // Agregar datos
    datos.forEach((item) => {
      const fecha = new Date(parseInt(item.fecha)).toLocaleDateString();
      worksheet.addRow({
        correo: item.correo,
        nombre: item.nombre,
        apellido: item.apellido,
        fecha: fecha,
        dia: item.dia,
        horario: item.tiempo,
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
