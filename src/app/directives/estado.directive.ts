import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEstado]',
  standalone: true,
})
export class EstadoDirective {
  constructor(private el: ElementRef) {}
}
