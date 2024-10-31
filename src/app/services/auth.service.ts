import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Unsubscribe,
} from '@angular/fire/auth';
import { FirebaseService } from './firebase.service';
import { Usuario } from '../models/usuario';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private fire = inject(FirebaseService);
  private util = inject(UtilsService);
  private router = inject(Router);
  private unSuscribe?: Unsubscribe;
  correo: string | null | undefined = undefined;
  usuarios: Usuario[] = [];
  rol = '';
  subFire?: Subscription;

  constructor() {
    this.unSuscribe = this.auth.onAuthStateChanged((auth) => {
      if (auth?.email) {
        this.correo = this.auth.currentUser?.email;
        this.getUser();
        setTimeout(() => {
          console.log(this.correo);
          console.log(this.rol);
        }, 2000);
      } else {
        this.rol = '';
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
    this.subFire = this.fire
      .getCollection('usuarios')
      .valueChanges()
      .subscribe((next) => {
        this.usuarios = next as Usuario[];
        this.rol = this.getRol(this.correo || '');
      });
  }

  getRol(correo: string) {
    for (let index = 0; index < this.usuarios.length; index++) {
      const element = this.usuarios[index];
      if (element.mail === correo) {
        return element.rol;
      }
    }
    return '';
  }

  rutearSegunRol(rol: string) {
    switch (rol) {
      case 'admin':
        this.util.ocultarSpinner();
        this.router.navigateByUrl('/admin');
        break;

      default:
        this.util.ocultarSpinner();
        break;
    }
  }
}
