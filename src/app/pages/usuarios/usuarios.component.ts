import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Usuario } from '../../models/usuario';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Alert } from '../../models/alert';
import { Router } from '@angular/router';

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
  // th: string[] = Especialista.getAtributos();

  constructor() {}

  ngOnInit(): void {}

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
