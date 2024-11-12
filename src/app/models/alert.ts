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

  static info(titulo: string = '', html: string = '') {
    return Swal.fire({
      title: titulo,
      html: html,
      icon: 'info',
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
    });
  }

  static encuesta(
    titulo: string = '',
    textBtnConfirm: string = '',
    textCancelBtn: string = ''
  ) {
    return Swal.fire({
      title: titulo,
      html: `
    <label for="calificacion-range">Calificar atención</label>
    <br>
    <input type="range" id="calificacion-range" name="calificacion" min="1" max="5" value="3" class="w-75 mt-2">
    <br><br>
    <input type="text" id="comentario-input" name="comentario" class="swal2-input w-75" placeholder="Escribe tu comentario">
  `,
      backdrop: true,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: textBtnConfirm,
      cancelButtonText: textCancelBtn,
      preConfirm: () => {
        const calificacion = (
          document.getElementById('calificacion-range') as HTMLInputElement
        ).value;
        const comentario = (
          document.getElementById('comentario-input') as HTMLInputElement
        ).value;

        return { calificacion, comentario };
      },
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
