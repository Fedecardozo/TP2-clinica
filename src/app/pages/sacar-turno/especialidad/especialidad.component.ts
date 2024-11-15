import { Component, EventEmitter, Output } from '@angular/core';
import { slideUpAnimation } from '../../../utils/animation';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css',
  animations: [slideUpAnimation],
})
export class EspecialidadComponent {
  @Output() incrementar = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();

  incrementarContador(item: string) {
    this.incrementar.emit(item);
  }
  goBack() {
    this.back.emit();
  }
}
