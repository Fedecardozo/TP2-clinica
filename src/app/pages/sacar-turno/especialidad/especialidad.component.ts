import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css',
})
export class EspecialidadComponent {
  @Output() incrementar = new EventEmitter<string>();
  incrementarContador(item: string) {
    this.incrementar.emit(item);
  }
}
