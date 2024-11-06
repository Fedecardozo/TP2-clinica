import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  user = inject(AuthService);
}
