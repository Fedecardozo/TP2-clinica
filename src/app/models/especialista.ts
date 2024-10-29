import { Usuario } from './usuario';

export class Especialista extends Usuario {
  especialidad: string[];
  foto_perfil: string;

  constructor(
    nombre: string,
    apellido: string,
    edad: string,
    dni: string,
    especialidad: string[],
    mail: string,
    password: string,
    foto_perfil: string,
    habilitado: boolean = false
  ) {
    super(
      nombre,
      apellido,
      edad,
      dni,
      mail,
      password,
      habilitado,
      'especialista'
    );

    this.especialidad = especialidad;
    this.foto_perfil = foto_perfil;
  }

  static get_especialidades() {
    return ['Cardiologo', 'Dentista', 'Cirujano', 'Pediatra', 'Otro'];
  }
}
