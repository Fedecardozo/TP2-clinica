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
import { FirebaseService } from '../../../services/firebase.service';
import { UtilsService } from '../../../services/utils.service';
import { Usuario } from '../../../models/usuario';
import { Rol } from '../../../models/rol';
import { AuthService } from '../../../services/auth.service';

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
  public util: UtilsService = inject(UtilsService);
  errorImg: string = '';
  imagenCargada: File | null = null;
  private fire: FirebaseService = inject(FirebaseService);
  private auth: AuthService = inject(AuthService);
  list_especialidades = ['Cardiologo', 'Dentista', 'Pediatra'];

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
      imagen: [''],
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

  generarUsuario(url: string): Usuario {
    const user = new Usuario();
    user.nombre = this.fg.controls['nombre'].value;
    user.apellido = this.fg.controls['apellido'].value;
    user.edad = this.fg.controls['edad'].value;
    user.dni = this.fg.controls['dni'].value;
    user.especialidad = this.fg.controls['especialidad'].value;
    user.mail = this.fg.controls['correo'].value;
    user.password = this.fg.controls['clave'].value;
    user.foto_url = url;
    user.rol = Rol.especialista;
    return user;
  }

  async cargar() {
    if (this.fg.valid && this.validarImagen()) {
      this.util.mostrarSpinner('Guardando especialista...');
      this.auth
        .registrarse(
          this.fg.controls['correo'].value,
          this.fg.controls['clave'].value
        )
        .then(() => {
          this.guardarFire();
        })
        .catch((err) => {
          this.util.ocultarSpinner();
          Alert.error('El correo ya se encuentra registrado');
        });
    } else {
      Alert.error('Hay campos vacios!', 'Complete todos los campos!');
    }
  }

  async guardarFire() {
    const url = await this.guardarImagen();
    const user = this.generarUsuario(url);

    this.fire
      .addUsuario(user)
      .then(() => {
        Alert.exito('Se cargo con exito!');
        this.fg.reset();
        this.errorImg = '';
        this.fg.controls['especialidad'].setValue(this.list_especialidades[0]);
      })
      .catch((res) => {
        console.log(res);
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
