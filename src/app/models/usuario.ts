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
  dias_de_trabajo: string[];
  horario_de_inicio: string;
  horario_de_fin: string;

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
    this.dias_de_trabajo = [];
    this.horario_de_inicio = '';
    this.horario_de_fin = '';

    //Paciente
    this.obra_social = '';
    this.foto_url_2 = '';
  }

  static getAtributosEspecialista() {
    return ['Nombre', 'Apellido', 'Edad', 'DNI', 'correo', 'Estado'];
  }
}
