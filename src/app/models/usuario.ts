export class Usuario {
  //Usuario
  id: string;
  nombre: string;
  apellido: string;
  edad: string;
  dni: string;
  mail: string;
  password: string;
  rol: string;
  habilitado: boolean;
  foto_url: string;

  //Especialista
  especialidad: string[];

  //Paciente
  obra_social: string;
  foto_url_2: string;

  constructor() {
    //Usuarios
    this.id = '';
    this.habilitado = false;
    this.nombre = '';
    this.apellido = '';
    this.edad = '';
    this.dni = '';
    this.mail = '';
    this.password = '';
    this.rol = '';
    this.foto_url = '';

    //Especialista
    this.especialidad = [];

    //Paciente
    this.obra_social = '';
    this.foto_url_2 = '';
  }
}
