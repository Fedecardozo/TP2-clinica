import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  Unsubscribe,
} from '@angular/fire/auth';
import { FirebaseService } from './firebase.service';
import { Usuario } from '../models/usuario';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private fire = inject(FirebaseService);
  private util = inject(UtilsService);
  private router = inject(Router);
  private adminEmail: string | null = null;
  private adminPassword: string | null = null;
  private unSuscribe?: Unsubscribe;
  correo: string | null | undefined = undefined;
  usuarios: Usuario[] = [];
  rol = '';
  subFire?: Subscription;
  userActual?: Usuario;

  constructor() {
    this.unSuscribe = this.auth.onAuthStateChanged((auth) => {
      if (auth?.email) {
        this.correo = this.auth.currentUser?.email;
        this.getUser();
        console.log(this.correo);
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

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        if (res.user.emailVerified) {
          this.rol = localStorage.getItem('rol') || '';
          //Dirige a sus rutas correspodientes
          this.rutearSegunRol(this.rol);
          setTimeout(() => {
            //Guardar log
            if (this.userActual) this.fire.addLog(this.userActual);
          }, 3000);
        } else {
          sendEmailVerification(res.user);
          this.cerrarSesion();
          Alert.error(
            'Su correo no esta verificado',
            'Verifique su casilla de correo electronico'
          );
        }
      })
      .catch(() => {
        //Muestro un alert de que no esta registrado
        Alert.error(
          'No se encuentra registrado',
          'Verifique correo y contraseña ingresadas'
        );
      });
  }

  async registrarse(email: string, password: string, usuario: Usuario) {
    try {
      const res = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      sendEmailVerification(res.user);

      // Cerrar sesión inmediatamente después del registro
      await this.auth.signOut();
      this.guardarDb(usuario);
    } catch (err) {
      this.util.ocultarSpinner();
      Alert.error('El correo ya se encuentra registrado');
    }
  }

  cerrarSesion() {
    localStorage.setItem('rol', '');
    return this.auth.signOut();
  }

  private getUser() {
    this.subFire = this.fire
      .getCollection('usuarios')
      .valueChanges()
      .subscribe((next) => {
        this.usuarios = next as Usuario[];
        this.userActual = this.getUserActual(this.correo || '') || undefined;
        this.rol = this.userActual?.rol || '';
        localStorage.setItem('rol', this.rol);
      });
  }

  private getUserActual(correo: string) {
    for (let index = 0; index < this.usuarios.length; index++) {
      const element = this.usuarios[index];
      if (element.mail === correo) {
        return element;
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
      case 'paciente':
        this.util.ocultarSpinner();
        this.router.navigateByUrl('/paciente');
        break;
      case 'especialista':
        this.util.ocultarSpinner();
        this.router.navigateByUrl('/especialista');
        break;
      default:
        this.util.ocultarSpinner();
        this.router.navigateByUrl('/home');
        break;
    }
  }

  async saveAdminCredentials(email: string, password: string): Promise<void> {
    this.adminEmail = email;
    this.adminPassword = password;
  }

  async registerUser(
    email: string,
    password: string,
    usuario: Usuario
  ): Promise<void> {
    try {
      // Guardar el usuario actual (admin) para volver a autenticarlo luego
      const currentUser = this.auth.currentUser;

      console.log(this.userActual);
      //Guardo las crendeciales
      this.saveAdminCredentials(
        this.userActual?.mail || '',
        this.userActual?.password || ''
      );

      // Crear el nuevo usuario
      const res = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      sendEmailVerification(res.user);

      // Cerrar la sesión del nuevo usuario
      await this.auth.signOut();

      // Volver a iniciar sesión con el usuario administrador
      if (currentUser && this.adminEmail && this.adminPassword) {
        await signInWithEmailAndPassword(
          this.auth,
          this.adminEmail,
          this.adminPassword
        );
      }

      this.guardarDb(usuario);
    } catch (error) {
      this.util.ocultarSpinner();
      console.error('Error al registrar el usuario:', error);
      Alert.error('El correo ya se encuentra registrado');
    }
  }

  async registrarUsuario(
    email: string,
    password: string,
    isAdmin: boolean,
    usuario: Usuario
  ) {
    if (isAdmin) {
      this.registerUser(email, password, usuario);
    } else {
      this.registrarse(email, password, usuario);
    }
  }

  async guardarDb(usuario: Usuario) {
    await this.fire
      .addUsuario(usuario)
      .then(() => {
        Alert.exito('Se cargo con exito!');
      })
      .catch((res) => {
        Alert.error(
          'No se pudo cargar a la base de datos!',
          'Intentelo más tarde.'
        );
      })
      .finally(() => {
        this.util.ocultarSpinner();
      });
  }
}
