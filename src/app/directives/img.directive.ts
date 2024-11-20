import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImg]',
  standalone: true,
})
export class ImgDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.transition = 'transform 0.3s ease-in-out';
    this.el.nativeElement.style.transform = 'scale(1.3)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.transform = 'scale(1)'; // Restaura el tamaño original
  }
}
