import { Turno } from './turno';
import { Usuario } from './usuario';

export class TurnoPaciente {
  turno: Turno;
  paciente: Usuario;

  constructor(turno: Turno, paciente: Usuario) {
    this.turno = turno;
    this.paciente = paciente;
  }
}
