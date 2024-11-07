import { Component, inject } from '@angular/core';
import { Turno } from '../../../models/turno';
import { FirebaseService } from '../../../services/firebase.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [TitleCasePipe, DatePipe],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css',
})
export class MisTurnosComponent {
  fire = inject(FirebaseService);
  auth = inject(AuthService);
  util = inject(UtilsService);
  router = inject(Router);
  th: string[];
  sub?: Subscription;
  turnos: Turno[] = [];
  pacientes: Usuario[] = [];

  constructor() {
    this.th = Turno.keys_paciente();
  }

  ngOnInit(): void {
    this.sub = this.fire
      .getCollection('turnos')
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Turno[];
        this.turnos = aux.filter(
          (item) => item.id_especialista === this.auth.userActual?.id
        );
        this.cargarPacientes();
      });
  }

  async cargarPacientes() {
    this.turnos.forEach(async (item) => {
      await this.fire.getUser(item.id_paciente).forEach((next) => {
        const paciente = next.data() as Usuario;
        this.pacientes.push(paciente);
      });
    });
  }

  getNamePaciente(usuario: Usuario) {
    if (usuario) return `${usuario.nombre ?? ''} ${usuario.apellido ?? ''}`;
    else return '...';
  }

  seleccion(turno: Turno) {
    // const isHabilitado = especialista.habilitado;
    // const text = isHabilitado ? 'inhabilitar' : 'habilitar';
    // Alert.question(`¿Desesa ${text} a este especialista?`).then((res) => {
    //   if (res.isConfirmed) {
    //     especialista.habilitado = !isHabilitado;
    //     this.fire.updateUser(especialista);
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
