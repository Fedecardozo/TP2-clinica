import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Unsubscribe,
} from '@angular/fire/auth';
import { FirebaseService } from './firebase.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private fire = inject(FirebaseService);
  private unSuscribe?: Unsubscribe;
  correo: string | null | undefined = undefined;
  usuario?: Usuario;

  constructor() {
    this.unSuscribe = this.auth.onAuthStateChanged((auth) => {
      if (auth?.email) {
        this.correo = this.auth.currentUser?.email;
        this.getUser();
      } else {
        this.correo = null;
      }
    });
  }

  desuscribir() {
    if (this.unSuscribe !== undefined) {
      this.unSuscribe();
    }
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  registrarse(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  cerrarSesion() {
    return this.auth.signOut();
  }

  private getUser() {
    this.fire
      .getCollection('usuarios')
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Usuario[];
        for (let index = 0; index < aux.length; index++) {
          const user = aux[index];
          if (user.mail === this.correo) {
            this.usuario = new Usuario(
              user.nombre,
              user.apellido,
              user.edad,
              user.dni,
              user.mail,
              user.password,
              user.habilitado,
              user.rol
            );
            break;
          }
        }
      });
  }
}
