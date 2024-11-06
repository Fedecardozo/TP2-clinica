import { Component, inject, Input } from '@angular/core';
import { Alert } from '../../../models/alert';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  FormArray,
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
  list_especialidades = ['Cardiologo', 'Dentista', 'Pediatra', 'Radiologo'];
  list_especialidad_selecionada: string[] = ['Dentista'];
  indexOtro = -1;
  isAdmin: boolean;

  constructor() {
    this.isAdmin = this.auth.rol === 'admin';
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
      edad: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      imagen: [''],
      otro: [''],
    });
  }

  addCheckEspecialidad(especialidad: string) {
    const index = this.list_especialidad_selecionada.indexOf(especialidad);

    if (index >= 0) this.list_especialidad_selecionada.splice(index, index + 1);
    else this.list_especialidad_selecionada.push(especialidad);
  }

  ngOnInit(): void {}

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
    user.especialidad = this.list_especialidad_selecionada;
    user.mail = this.fg.controls['correo'].value;
    user.password = this.fg.controls['clave'].value;
    user.foto_url = url;
    user.rol = Rol.especialista;
    return user;
  }

  verificarOtro() {
    const otro = this.fg.controls['otro'].value;
    console.log(this.indexOtro);
    if (this.indexOtro >= 0) {
      this.list_especialidad_selecionada.splice(
        this.indexOtro,
        this.indexOtro + 1
      );
      this.indexOtro = -1;
    }
    if (otro !== '')
      this.indexOtro = this.list_especialidad_selecionada.push(otro) - 1;
  }

  async cargar() {
    this.verificarOtro();
    if (
      this.fg.valid &&
      this.validarImagen() &&
      this.list_especialidad_selecionada.length
    ) {
      this.util.mostrarSpinner('Guardando especialista...');

      this.guardarFire();
    } else {
      Alert.error('Hay campos vacios!', 'Complete todos los campos!');
      //Muestro todos los errores
      Object.keys(this.fg.controls).forEach((controlName) => {
        this.fg.controls[controlName].markAsTouched();
      });
    }
  }

  async guardarFire() {
    const url = await this.guardarImagen();
    const user = this.generarUsuario(url);
    this.auth.registrarUsuario(
      this.fg.controls['correo'].value,
      this.fg.controls['clave'].value,
      this.isAdmin,
      user
    );
    this.fg.reset();
    this.errorImg = '';
  }
}
