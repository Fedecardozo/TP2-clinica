import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UtilsService } from './services/utils.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'clinica';
  util: UtilsService = inject(UtilsService);
  user: AuthService = inject(AuthService);
  router: Router = inject(Router);

  async cerrarSesion() {
    await this.user.cerrarSesion();
    this.router.navigateByUrl('home');
  }
}
