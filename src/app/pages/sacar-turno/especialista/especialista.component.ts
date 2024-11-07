import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Usuario } from '../../../models/usuario';
import { UtilsService } from '../../../services/utils.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-especialista',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './especialista.component.html',
  styleUrl: './especialista.component.css',
})
export class EspecialistaComponent {
  @Output() incrementar = new EventEmitter<Usuario>();
  @Input() especialidad = '';
  @Output() back = new EventEmitter<void>();
  fire = inject(FirebaseService);
  util = inject(UtilsService);
  list_especialista: Usuario[] = [];

  goBack() {
    this.back.emit();
  }

  ngOnInit(): void {
    this.fire
      .getCollection('usuarios')
      .valueChanges()
      .subscribe((next) => {
        const aux = next as Usuario[];
        aux.forEach((item) => {
          item.especialidad.forEach((esp) => {
            if (esp.toLowerCase() === this.especialidad.toLocaleLowerCase()) {
              this.list_especialista.push(item);
            }
          });
        });
      });
  }

  incrementarContador(item: Usuario) {
    this.incrementar.emit(item);
  }
}
