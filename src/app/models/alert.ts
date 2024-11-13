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

  static resenia_especialista() {
    let claveValorCount = 0;

    return Swal.fire({
      title: 'Ingrese los datos',
      html: `
        <input id="altura" class="swal2-input" placeholder="Altura (cm)" type="number">
        <input id="peso" class="swal2-input" placeholder="Peso (kg)" type="number">
        <input id="presion" class="swal2-input" placeholder="Presión (mmHg)" type="number">
        <input id="temperatura" class="swal2-input" placeholder="Temperatura (°C)" type="number">
        <div id="extraFieldsContainer"></div>
        <button id="addFieldButton" class="swal2-confirm swal2-styled" style="margin-top: 10px;">Agregar otro</button>
        <textarea id="reseña" class="swal2-textarea" placeholder="Reseña"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Si, finalizar',
      cancelButtonText: 'No, finalizar',
      backdrop: true,
      allowOutsideClick: false,
      didOpen: () => {
        const addFieldButton = document.getElementById('addFieldButton');
        const extraFieldsContainer = document.getElementById(
          'extraFieldsContainer'
        );

        addFieldButton?.addEventListener('click', () => {
          if (claveValorCount < 3) {
            claveValorCount++;
            const claveValorHTML = `
              <div id="extraField${claveValorCount}" style="display: flex; gap: 5px; margin-bottom: 5px;">
                <input id="extraKey${claveValorCount}" class="swal2-input" style="width: 50%;" placeholder="Clave extra ${claveValorCount}">
                <input id="extraValue${claveValorCount}" class="swal2-input" style="width: 50%;" placeholder="Valor ${claveValorCount}" type="number">
              </div>`;
            extraFieldsContainer?.insertAdjacentHTML(
              'beforeend',
              claveValorHTML
            );

            if (claveValorCount === 3) {
              addFieldButton.style.display = 'none';
            }
          }
        });
      },
      preConfirm: () => {
        const altura = (document.getElementById('altura') as HTMLInputElement)
          .value;
        const peso = (document.getElementById('peso') as HTMLInputElement)
          .value;
        const presion = (document.getElementById('presion') as HTMLInputElement)
          .value;
        const temperatura = (
          document.getElementById('temperatura') as HTMLInputElement
        ).value;

        // Validar que todos los campos requeridos estén completos
        if (!altura || !peso || !presion || !temperatura) {
          Swal.showValidationMessage(
            'Por favor, complete los campos de altura, peso, presión y temperatura.'
          );
          return;
        }

        const reseña = (document.getElementById('reseña') as HTMLInputElement)
          .value;

        const extraFields = [];
        for (let i = 1; i <= claveValorCount; i++) {
          const key = (
            document.getElementById(`extraKey${i}`) as HTMLInputElement
          ).value;
          const value = +(
            document.getElementById(`extraValue${i}`) as HTMLInputElement
          ).value;
          if (key && !isNaN(value)) {
            extraFields.push({ clave: key, valor: value });
          }
        }

        return {
          altura: +altura,
          peso: +peso,
          presion: +presion,
          temperatura: +temperatura,
          extraFields,
          reseña,
        };
      },
    });
  }
}
