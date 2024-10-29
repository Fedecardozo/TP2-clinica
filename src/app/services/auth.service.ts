import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Unsubscribe,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private unSuscribe?: Unsubscribe;
  correo: string | null | undefined = undefined;
  rol: string = '';

  constructor() {
    this.unSuscribe = this.auth.onAuthStateChanged((auth) => {
      if (auth?.email) {
        this.correo = this.auth.currentUser?.email;
        if (this.correo === 'admin@g.com') {
          this.rol = 'admin';
          console.log(this.rol);
        }
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
}
