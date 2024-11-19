import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado',
  standalone: true,
})
export class EstadoPipe implements PipeTransform {
  transform(value: boolean, ...args: unknown[]): unknown {
    return value ? 'Habilitado' : 'Inhabilitado';
  }
}
