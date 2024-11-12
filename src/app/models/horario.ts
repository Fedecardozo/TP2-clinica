export class Horario {
  fecha: Date;
  horario: string[];
  hora_seleccionada: string;

  constructor(fecha: Date, horario: string[] = []) {
    this.fecha = fecha;
    this.horario = horario;
    this.hora_seleccionada = '';
  }

  static convertirFecha(fecha_number: string) {
    const timestampSoloFecha = parseInt(fecha_number); // Ejemplo de timestamp en milisegundos

    const fecha = new Date(timestampSoloFecha);
    const fechaLegible = `${fecha.getFullYear()}-${(fecha.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;

    return fechaLegible;
  }
}
