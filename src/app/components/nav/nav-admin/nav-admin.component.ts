import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UtilsService } from '../../../services/utils.service';
import { fadeIn } from '../../../utils/animation';

@Component({
  selector: 'app-nav-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css',
  animations: [fadeIn],
})
export class NavAdminComponent {
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
