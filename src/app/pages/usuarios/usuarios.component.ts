import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Usuario } from '../../models/usuario';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Alert } from '../../models/alert';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Rol } from '../../models/rol';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  fire = inject(FirebaseService);
  auth = inject(AuthService);
  router = inject(Router);
  th: string[] = Usuario.getAtributosEspecialista();
  sub?: Subscription;
  especialistas: Usuario[] = [];

  constructor() {}

  ngOnInit(): void {
    this.sub = this.fire
      .getCollection()
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Usuario[];
        this.especialistas = aux.filter(
          (item) => (item.rol = Rol.especialista)
        );
        console.log(this.especialistas);
      });
  }

  seleccion(especialista: Usuario) {
    if (especialista.habilitado) {
      Alert.question('¿Desesa inhabilitar a este especialista?').then((res) => {
        if (res.isConfirmed) {
          especialista.habilitado = false;
        }
      });
    } else {
      Alert.question('¿Desea habilitar a este especialista?').then((res) => {
        if (res.isConfirmed) {
          especialista.habilitado = true;
        }
      });
    }
  }

  guardarCambios() {
    Alert.question('¿Esta seguro de guardar los cambios?').then((res) => {
      if (res.isConfirmed) {
        // this.fire.addUsuario(this.especialistas,'especialistas');
      }
    });
  }
}
