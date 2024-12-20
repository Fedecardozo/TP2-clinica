import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { TitleCasePipe } from '@angular/common';
import { slideUpAnimation } from '../../../utils/animation';
import { DniPipe } from '../../../pipes/dni.pipe';
import { ImgDirective } from '../../../directives/img.directive';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [TitleCasePipe, DniPipe, ImgDirective],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  animations: [slideUpAnimation],
})
export class PerfilComponent {
  user = inject(AuthService);
}
