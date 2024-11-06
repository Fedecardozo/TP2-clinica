import { Component, inject } from '@angular/core';
import { Alert } from '../../models/alert';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public fb: FormBuilder = inject(FormBuilder);
  public fg: FormGroup;
  private userService: AuthService = inject(AuthService);
  private router = inject(Router);
  private util = inject(UtilsService);
  private fire = inject(FirebaseService);
  private subFire?: Subscription;
  private usuarios: Usuario[] = [];
  usuario = new Usuario();

  constructor() {
    this.fg = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subFire = this.fire
      .getCollection('usuarios')
      .valueChanges()
      .subscribe((next) => {
        this.usuarios = next as Usuario[];
      });
  }

  ngOnDestroy(): void {
    this.subFire?.unsubscribe();
  }

  accesoRapido(mail: string, password: string) {
    this.fg.controls['correo'].setValue(mail);
    this.fg.controls['clave'].setValue(password);
  }

  acceder() {
    if (this.fg.valid) {
      this.util.mostrarSpinner('Iniciando sesión...');
      setTimeout(() => {
        const flag = this.getUsuario(
          this.fg.controls['correo'].value,
          this.fg.controls['clave'].value
        );

        //Antes de iniciar sesion tengo que ver que esten habilitados para usar el sistema
        if (flag) {
          localStorage.setItem('rol', this.usuario.rol);
          if (this.usuario.habilitado) this.iniciarSesion();
          else {
            Alert.error(
              'No se encuentra habilitado',
              'Consulte en administración para la habilitación'
            );
            this.util.ocultarSpinner();
          }
        } else {
          this.util.ocultarSpinner();
          Alert.error(
            'No se encuentra registrado',
            'Verifique correo y contraseña ingresadas'
          );
        }
      }, 2000);
    } else {
      //Muestro todos los errores
      Object.keys(this.fg.controls).forEach((controlName) => {
        this.fg.controls[controlName].markAsTouched();
      });
    }
  }

  getUsuario(correo: string, clave: string) {
    for (let index = 0; index < this.usuarios.length; index++) {
      const element = this.usuarios[index];
      if (element.mail === correo && element.password === clave) {
        this.usuario = element;
        return true;
      }
    }
    return false;
  }

  async iniciarSesion() {
    await this.userService.login(
      this.fg.controls['correo'].value,
      this.fg.controls['clave'].value
    );

    this.fg.reset();
    this.util.ocultarSpinner();
  }
}
