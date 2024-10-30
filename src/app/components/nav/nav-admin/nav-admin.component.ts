import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css',
})
export class NavAdminComponent {
  user: AuthService = inject(AuthService);
  router: Router = inject(Router);

  async cerrarSesion() {
    await this.user.cerrarSesion();
    this.router.navigateByUrl('home');
  }
}
