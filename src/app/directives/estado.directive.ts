import { Directive, ElementRef, HostListener } from '@angular/core';
import { Turno } from '../models/turno';

@Directive({
  selector: '[appEstado]',
  standalone: true,
})
export class EstadoDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.transition = 'transform 0.3s ease-in-out';
    this.el.nativeElement.style.transform = 'scale(1.2)';
    this.cambiarColor();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.transform = 'scale(1)'; // Restaura el tamaño original
    this.el.nativeElement.style.color = 'black';
  }

  cambiarColor() {
    const element = this.el.nativeElement.style;
    const text = `${this.el.nativeElement.innerText}`.toLowerCase();
    switch (text) {
      case Turno.estado_cancelado:
        element.color = 'red';
        break;
      case Turno.estado_aceptado:
        element.color = 'blue';
        break;
      case Turno.estado_pediente:
        element.color = 'purple';
        break;
      default:
        element.color = 'green';
        break;
    }
  }
}
