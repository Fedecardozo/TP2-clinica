import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  spinner: boolean = false;
  tituloSpinner: string = '';

  siteKey: string;
  theme: any;

  constructor() {
    this.siteKey = '6Ld_r3cqAAAAAKzRjEKwEDHBqhtzP1O9M28oMk-E';
    this.theme = 'Light';
  }

  mostrarSpinner(tituloSpinner: string = '') {
    this.spinner = true;
    this.tituloSpinner = tituloSpinner;
  }

  ocultarSpinner() {
    this.spinner = false;
  }

  generar_horarios(
    hora: number,
    fin_hora: number = 18,
    fin_minutos: number = 30
  ) {
    const aux = [];
    let minutos = 30;

    do {
      if (hora < 19 && minutos === 0) minutos += 30;
      else if (hora < 19 && minutos === 30) {
        minutos = 0;
        hora++;
      }

      aux.push(
        `${hora >= 10 ? hora : '0' + hora}:${minutos === 30 ? minutos : '00'}`
      );

      if (hora === fin_hora && minutos === fin_minutos) break;
    } while (true);

    return aux;
  }
}
