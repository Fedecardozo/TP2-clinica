export class Usuario {
  nombre: string;
  apellido: string;
  edad: string;
  dni: string;
  mail: string;
  password: string;
  id: string;
  habilitado: boolean;
  rol: string;
  constructor(
    nombre: string,
    apellido: string,
    edad: string,
    dni: string,
    mail: string,
    password: string,
    habilitado: boolean = false,
    rol: string
  ) {
    this.id = '';
    this.habilitado = habilitado;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
    this.mail = mail;
    this.password = password;
    this.rol = rol;
  }
}
