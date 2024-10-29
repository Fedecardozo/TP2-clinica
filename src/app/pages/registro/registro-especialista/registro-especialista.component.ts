import { Component, inject } from '@angular/core';
import { Alert } from '../../../models/alert';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FirebaseService } from '../../../services/firebase.service';
import { Especialista } from '../../../models/especialista';

@Component({
  selector: 'app-registro-especialista',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './registro-especialista.component.html',
  styleUrl: './registro-especialista.component.css',
})
export class RegistroEspecialistaComponent {
  public fb: FormBuilder = inject(FormBuilder);
  public fg: FormGroup;
  private userService: AuthService = inject(AuthService);
  private router = inject(Router);
  errorImg: string = '';
  imagenCargada: File | null = null;
  private fire: FirebaseService = inject(FirebaseService);
  list_especialidades: string[] = Especialista.get_especialidades();

  constructor() {
    this.fg = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: [
        '',
        [
          Validators.required,
          Validators.min(1000000),
          Validators.max(99999999),
        ],
      ],
      especialidad: [this.list_especialidades[0]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
    });
  }

  validarImagen(): boolean {
    if (this.fg.controls['imagen'].value === '') {
      this.errorImg = 'Este campo es requerido';
      return false;
    } else {
      this.errorImg = '';
    }
    return true;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenCargada = file; // Guardamos el archivo cargado
    } else {
      this.imagenCargada = null;
    }
  }

  async guardarImagen() {
    if (this.imagenCargada) {
      return await this.fire.subirImg(this.imagenCargada);
    }
  }
}
