import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dni',
  standalone: true,
})
export class DniPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    console.log(value);
    let dni = value.toString();

    if (dni.length === 7) {
      dni = `0${dni[0]}.${dni.substring(1, 4)}.${dni.substring(4, 7)}`;
    } else if (dni.length === 8) {
      dni = `${dni.substring(0, 2)}.${dni.substring(2, 5)}.${dni.substring(
        5,
        8
      )}`;
    }

    return dni;
  }
}
