import { Usuario } from './usuario';

export class Paciente extends Usuario {
  obra_social: string;
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
    super(nombre, apellido, edad, dni, mail, password);
    this.obra_social = obra_social;
    this.foto_url_1 = foto_url_1;
    this.foto_url_2 = foto_url_2;
  }
}
