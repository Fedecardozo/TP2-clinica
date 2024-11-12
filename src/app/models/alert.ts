import Swal from 'sweetalert2';

export class Alert {
  static exito(titulo: string = '', texto: string = '') {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'success',
      backdrop: true, // Esta opción asegura que el fondo sea oscuro
      allowOutsideClick: false, // Impide cerrar al hacer clic fuera del modal
    });
  }

  static question(titulo: string = '', texto: string = '') {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      backdrop: true, // Esta opción asegura que el fondo sea oscuro
      allowOutsideClick: false, // Impide cerrar al hacer clic fuera del modal
    });
  }

  static error(titulo: string = '', texto: string = '') {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'error',
      backdrop: true, // Esta opción asegura que el fondo sea oscuro
      allowOutsideClick: false, // Impide cerrar al hacer clic fuera del modal
    });
  }

  static input(
    titulo: string = '',
    textBtnConfirm: string = '',
    textCancelBtn: string = ''
  ) {
    return Swal.fire({
      title: titulo,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      backdrop: true, // Esta opción asegura que el fondo sea oscuro
      allowOutsideClick: false, // Impide cerrar al hacer clic fuera del modal
      showCancelButton: true,
      confirmButtonText: textBtnConfirm,
      cancelButtonText: textCancelBtn,
      showLoaderOnConfirm: true,
    });
  }

  static msjTimer(titulo: string, icono: 'success' | 'error' = 'success') {
    Swal.fire({
      position: 'center',
      icon: icono,
      title: titulo,
      backdrop: true, // Esta opción asegura que el fondo sea oscuro
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
