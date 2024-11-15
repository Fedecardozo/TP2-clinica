import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

export const slideUpAnimation = trigger('slideUp', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }), // Comienza desde fuera de la pantalla (parte inferior)
    animate(
      '500ms ease-out',
      style({ transform: 'translateY(0)', opacity: 1 })
    ), // Termina en su posición original
  ]),
  transition(':leave', [
    animate(
      '500ms ease-in',
      style({ transform: 'translateY(100%)', opacity: 0 })
    ), // Desaparece hacia abajo
  ]),
]);

export const fadeIn = trigger('fadeIn', [
  state('show', style({ opacity: 1 })),
  state('hide', style({ opacity: 0 })),
  transition('hide => show', [animate('2s ease-in')]),
  transition('show => hide', [animate('2s ease-out')]),
]);
