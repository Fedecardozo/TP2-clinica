import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { Alert } from '../../../models/alert';
import { Rol } from '../../../models/rol';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { TitleCasePipe } from '@angular/common';
import { slideUpAnimation } from '../../../utils/animation';
import { DniPipe } from '../../../pipes/dni.pipe';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [TitleCasePipe, RouterLink, DniPipe],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css',
  animations: [slideUpAnimation],
})
export class PacienteComponent {
  fire = inject(FirebaseService);
  auth = inject(AuthService);
  router = inject(Router);
  th: string[] = Usuario.getAtributosPaciente();
  sub?: Subscription;
  pacientes: Usuario[] = [];
  @Output() seleccion_paciente = new EventEmitter<Usuario>();

  constructor() {}

  ngOnInit(): void {
    this.sub = this.fire
      .getCollection()
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Usuario[];
        this.pacientes = aux.filter((item) => item.rol === Rol.paciente);
      });
  }

  seleccion(paciente: Usuario) {
    this.seleccion_paciente.emit(paciente);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
