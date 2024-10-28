import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  spinner: boolean = false;
  tituloSpinner: string = '';

  mostrarSpinner(tituloSpinner: string = '') {
    this.spinner = true;
    this.tituloSpinner = tituloSpinner;
  }

  ocultarSpinner() {
    this.spinner = false;
  }
}
