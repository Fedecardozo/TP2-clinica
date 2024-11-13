import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  user = inject(AuthService);
  decoration = 'm-3 text-primary text-decoration-underline';
  decoration2 = 'm-3 text-primary';
  perfil = true;

  constructor() {}

  ngOnInit(): void {}

  clickHistorial() {
    if (this.perfil) {
      const aux = this.decoration;
      this.decoration = this.decoration2;
      this.decoration2 = aux;
      this.perfil = false;
    }
  }

  clickPefil() {
    if (!this.perfil) {
      const aux = this.decoration2;
      this.decoration2 = this.decoration;
      this.decoration = aux;
      this.perfil = true;
    }
  }
}
