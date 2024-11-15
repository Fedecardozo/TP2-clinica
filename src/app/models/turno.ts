import { Alert } from './alert';

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
  reseña_especialista: string;
  calificacion: string;
  paciente: string;
  edad_paciente: string;
  acciones: string[];
  altura: number;
  peso: number;
  temperatura: number;
  presion: number;
  // map: Map<string, number>;
  msjMap: string[];

  static estado_pediente = 'pediente';
  static estado_aceptado = 'aceptado';
  static estado_cancelado = 'cancelado';
  static estado_rechazado = 'rechazado';
  static estado_realizado = 'realizado';
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
    this.calificacion = '';
    this.altura = 0;
    this.peso = 0;
    this.presion = 0;
    this.temperatura = 0;
    // this.map = new Map<string, number>();
    this.reseña_especialista = '';
    this.msjMap = [];
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
      'acciones',
    ];
  }

  static keys_admin() {
    return [
      'Paciente',
      'Especialista',
      'especialidad',
      'fecha',
      'hora',
      'estado',
      'acciones',
    ];
  }

  static generarAcciones(turno: Turno) {
    const acciones = [];
    if (turno.reseña || turno.reseña_especialista) acciones.push('Ver reseña');
    switch (turno.estado) {
      case Turno.estado_pediente:
      case Turno.estado_aceptado:
        acciones.push('Cancelar');
        break;
      case Turno.estado_realizado:
        acciones.push('Realizar encuesta');
        break;
    }
    turno.acciones = [...acciones];
  }

  static generarAccionesEspecialista(turno: Turno) {
    const acciones = [];
    if (turno.reseña || turno.reseña_especialista) acciones.push('Ver reseña');
    switch (turno.estado) {
      case Turno.estado_pediente:
        acciones.push('Rechazar');
        acciones.push('Aceptar');
        break;
      case Turno.estado_aceptado:
        acciones.push('Cancelar');
        acciones.push('Finalizar');
        break;
    }
    turno.acciones = [...acciones];
  }

  static verResenia(turno: Turno) {
    let msj = `Comentario del paciente: ${
      turno.reseña || 'No hay comentarios'
    }<br><br>${
      turno.calificacion
        ? 'Calificación: ' + turno.calificacion + ' puntos'
        : ''
    }`;

    msj =
      msj +
      `Reseña del especilista: ${
        turno.reseña_especialista || 'No dejo reseñas'
      }`;
    let estado = '';

    if (turno.estado === Turno.estado_cancelado) estado = 'cancelación';
    else if (turno.estado == Turno.estado_rechazado) estado = 'rechazo';

    const reseña =
      turno.estado === Turno.estado_finalizado ||
      turno.estado === Turno.estado_realizado;

    const titulo = !reseña ? 'Motivo de ' + estado : 'Reseña';

    Alert.info(titulo, msj);
  }
}
