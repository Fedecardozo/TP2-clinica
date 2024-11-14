import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Usuario } from '../../models/usuario';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Alert } from '../../models/alert';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Rol } from '../../models/rol';
import { HistoriaClinicaComponent } from '../../components/historia-clinica/historia-clinica.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TitleCasePipe, RouterLink, HistoriaClinicaComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  fire = inject(FirebaseService);
  auth = inject(AuthService);
  router = inject(Router);
  th: string[] = Usuario.getAtributosEspecialista();
  sub?: Subscription;
  usuarios: Usuario[] = [];
  especialistas: Usuario[] = [];
  pacientes: Usuario[] = [];
  admins: Usuario[] = [];
  paciente: boolean = false;
  especialista: boolean = true;
  admin: boolean = false;
  decoration = 'm-3 text-primary text-decoration-underline';
  decorationAux = 'm-3 text-primary';
  decoration1 = this.decoration;
  decoration2 = this.decorationAux;
  decoration3 = this.decorationAux;
  mostrarHistorial = false;
  id_user = '';

  constructor() {}

  ngOnInit(): void {
    this.sub = this.fire
      .getCollection()
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Usuario[];
        this.especialistas = aux.filter(
          (item) => item.rol === Rol.especialista
        );
        this.usuarios = [...this.especialistas];
        this.admins = aux.filter((item) => item.rol === Rol.admin);
        this.pacientes = aux.filter((item) => item.rol === Rol.paciente);
      });
  }

  seleccion(especialista: Usuario) {
    const isHabilitado = especialista.habilitado;
    const text = isHabilitado ? 'inhabilitar' : 'habilitar';
    Alert.question(`¿Desesa ${text} a este especialista?`).then((res) => {
      if (res.isConfirmed) {
        especialista.habilitado = !isHabilitado;
        this.fire.updateUser(especialista);
      }
    });
  }

  click(num: number) {
    switch (num) {
      case 1:
        this.especialista = true;
        this.paciente = false;
        this.admin = false;
        this.decoration1 = this.decoration;
        this.decoration2 = this.decorationAux;
        this.decoration3 = this.decorationAux;
        this.usuarios = [...this.especialistas];

        break;

      case 2:
        this.especialista = false;
        this.paciente = true;
        this.admin = false;
        this.decoration1 = this.decorationAux;
        this.decoration2 = this.decoration;
        this.decoration3 = this.decorationAux;
        this.usuarios = [...this.pacientes];
        break;

      case 3:
        this.especialista = false;
        this.paciente = false;
        this.admin = true;
        this.decoration1 = this.decorationAux;
        this.decoration2 = this.decorationAux;
        this.decoration3 = this.decoration;
        this.usuarios = [...this.admins];
        break;
    }
  }

  verHistoria(user: Usuario) {
    this.mostrarHistorial = true;
    this.id_user = user.id;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
