export class Turno {
  especialidad: string;
  especialista: string;
  fecha: string;
  hora: string;
  email_especialista: string;
  estado: string;
  id_paciente: string;
  id_especialista: string;
  id: string;
  reseña: string;

  static estado_pediente = 'pediente';
  static estado_aceptado = 'aceptado';
  static estado_cancelado = 'cancelado';

  constructor() {
    this.especialidad = '';
    this.especialista = '';
    this.fecha = '';
    this.hora = '';
    this.email_especialista = '';
    this.estado = '';
    this.id_paciente = '';
    this.id_especialista = '';
    this.id = '';
    this.reseña = '';
  }

  static keys() {
    return [
      'especialidad',
      'especialista',
      'fecha',
      'hora',
      'email_especialista',
      'estado',
    ];
  }
}
