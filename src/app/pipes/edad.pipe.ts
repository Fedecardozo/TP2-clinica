import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad',
  standalone: true,
})
export class EdadPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value + ' años';
  }
}
