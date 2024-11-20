import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEnter]',
  standalone: true,
})
export class EnterDirective {
  constructor(private el: ElementRef) {}

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.key === 'Enter') {
      const button = this.el.nativeElement.querySelector('button');
      if (button) button.click();
    }
  }
}
