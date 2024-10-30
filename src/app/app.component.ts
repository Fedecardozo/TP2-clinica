import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UtilsService } from './services/utils.service';
import { AuthService } from './services/auth.service';
import { NavAdminComponent } from './components/nav/nav-admin/nav-admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'clinica';
  util: UtilsService = inject(UtilsService);
  user: AuthService = inject(AuthService);
}
