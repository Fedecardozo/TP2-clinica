import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UtilsService } from '../../../services/utils.service';
import { Router, RouterLink } from '@angular/router';
import { fadeIn } from '../../../utils/animation';

@Component({
  selector: 'app-nav-especialista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-especialista.component.html',
  styleUrl: './nav-especialista.component.css',
  animations: [fadeIn],
})
export class NavEspecialistaComponent {
  user: AuthService = inject(AuthService);
  router: Router = inject(Router);
  util: UtilsService = inject(UtilsService);
  obj_isFadein: any;

  constructor() {
    this.obj_isFadein = { isFadein: false };
    this.util.mostrarFadeIn(this.obj_isFadein);
  }
  async cerrarSesion() {
    this.util.mostrarSpinner('Cerrando sesión...');
    await this.user.cerrarSesion();
    setTimeout(() => {
      this.util.ocultarSpinner();
      this.router.navigateByUrl('home');
    }, 1500);
  }
}
