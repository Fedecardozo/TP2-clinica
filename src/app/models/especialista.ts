export class Especialista {
  nombre: string;
  apellido: string;
  edad: string;
  dni: string;
  especialidad: string[];
  mail: string;
  password: string;
  foto_perfil: string;

  constructor(
    nombre: string,
    apellido: string,
    edad: string,
    dni: string,
    especialidad: string[],
    mail: string,
    password: string,
    foto_perfil: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
    this.especialidad = especialidad;
    this.mail = mail;
    this.password = password;
    this.foto_perfil = foto_perfil;
  }

  static get_especialidades() {
    return ['Cardiologo', 'Dentista', 'Cirujano', 'Pediatra'];
  }
}
