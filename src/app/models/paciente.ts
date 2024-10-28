export class Paciente {
  nombre: string;
  apellido: string;
  edad: string;
  dni: string;
  obra_social: string;
  mail: string;
  password: string;
  foto_url_1: string;
  foto_url_2: string;

  constructor(
    nombre: string,
    apellido: string,
    edad: string,
    dni: string,
    obra_social: string,
    mail: string,
    password: string,
    foto_url_1: string,
    foto_url_2: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
    this.obra_social = obra_social;
    this.mail = mail;
    this.password = password;
    this.foto_url_1 = foto_url_1;
    this.foto_url_2 = foto_url_2;
  }
}
