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
  paciente: string;
  edad_paciente: string;
  acciones: string[];

  static estado_pediente = 'pediente';
  static estado_aceptado = 'aceptado';
  static estado_cancelado = 'cancelado';
  static estado_finalizado = 'finalizado';

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
    this.paciente = '';
    this.edad_paciente = '';
    this.acciones = [];
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

  static keys_paciente() {
    return [
      'Paciente',
      'edad',
      'correo',
      'obra social',
      'especialidad',
      'fecha',
      'hora',
      'estado',
    ];
  }
}
