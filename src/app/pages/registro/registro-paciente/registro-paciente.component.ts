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
import { Usuario } from '../../../models/usuario';
import { Rol } from '../../../models/rol';
import { UtilsService } from '../../../services/utils.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './registro-paciente.component.html',
  styleUrl: './registro-paciente.component.css',
})
export class RegistroPacienteComponent {
  public fb: FormBuilder = inject(FormBuilder);
  public fg: FormGroup;
  public util: UtilsService = inject(UtilsService);
  public auth: AuthService = inject(AuthService);
  errorImg: string = '';
  imagenCargada: File | null = null;
  imagenCargada2: File | null = null;
  private fire: FirebaseService = inject(FirebaseService);

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
      obraSocial: [''],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      imagen: [''],
      imagen2: [''],
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

  onFileChange2(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenCargada2 = file; // Guardamos el archivo cargado
    } else {
      this.imagenCargada2 = null;
    }
  }

  async guardarImagen(img: any) {
    if (img) {
      return await this.fire.subirImg(img);
    }
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
      //Muestro todos los errores
      Object.keys(this.fg.controls).forEach((controlName) => {
        this.fg.controls[controlName].markAsTouched();
      });
    }
  }

  async guardarFire() {
    const url = await this.guardarImagen(this.imagenCargada);
    const url2 = await this.guardarImagen(this.imagenCargada2);
    const user = this.generarUsuario(url, url2);

    this.fire
      .addUsuario(user)
      .then(() => {
        Alert.exito('Se cargo con exito!');
        this.fg.reset();
        this.errorImg = '';
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

  generarUsuario(url: string, url2: string): Usuario {
    const user = new Usuario();
    user.nombre = this.fg.controls['nombre'].value;
    user.apellido = this.fg.controls['apellido'].value;
    user.edad = this.fg.controls['edad'].value;
    user.dni = this.fg.controls['dni'].value;
    user.obra_social = this.fg.controls['obraSocial'].value;
    user.mail = this.fg.controls['correo'].value;
    user.password = this.fg.controls['clave'].value;
    user.foto_url = url;
    user.foto_url_2 = url2;
    user.rol = Rol.paciente;
    return user;
  }
}
