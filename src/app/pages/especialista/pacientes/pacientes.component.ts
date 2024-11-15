import { Component, inject } from '@angular/core';
import { HistoriaClinicaComponent } from '../../../components/historia-clinica/historia-clinica.component';
import { AuthService } from '../../../services/auth.service';
import { slideUpAnimation } from '../../../utils/animation';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [HistoriaClinicaComponent],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css',
  animations: [slideUpAnimation],
})
export class PacientesComponent {
  user = inject(AuthService);
}
