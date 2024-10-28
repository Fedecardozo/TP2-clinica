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
    if (this.fg.valid) {
      this.userService
        .login(
          this.fg.controls['correo'].value,
          this.fg.controls['clave'].value
        )
        .then(() => {
          this.router.navigateByUrl('/home');
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
        });
    }
  }
}
