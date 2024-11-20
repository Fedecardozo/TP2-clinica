import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTr]',
  standalone: true,
})
export class TrDirective {
  constructor(private el: ElementRef) {}
}
