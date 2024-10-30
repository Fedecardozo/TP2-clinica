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

  constructor() {
    this.fg = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
    });
  }

  accesoRapido(mail: string, password: string) {
    this.fg.controls['correo'].setValue(mail);
    this.fg.controls['clave'].setValue(password);
  }

  acceder() {
    this.util.mostrarSpinner('Iniciando sesión...');
    if (this.fg.valid) {
      this.userService
        .login(
          this.fg.controls['correo'].value,
          this.fg.controls['clave'].value
        )
        .then(() => {
          this.userService.getRol(this.fg.controls['correo'].value);
          console.log(this.userService.rol);
          if (this.userService.rol === 'admin') {
            this.util.ocultarSpinner();
            this.router.navigateByUrl('/admin');
          }
        })
        .catch(() => {
          //Muestro un alert de que no esta registrado
          Alert.error(
            'No se encuentra registrado',
            'Verifique correo y contraseña ingresadas'
          );
        })
        .finally(() => {
          this.fg.reset();
          this.util.ocultarSpinner();
        });
    }
  }
}
