export class Horario {
  fecha: Date;
  horario: string[];
  hora_seleccionada: string;

  constructor(fecha: Date, horario: string[] = []) {
    this.fecha = fecha;
    this.horario = horario;
    this.hora_seleccionada = '';
  }
}
