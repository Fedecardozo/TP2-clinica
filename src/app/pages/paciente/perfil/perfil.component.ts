import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario';
import { DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';
import { Subscription } from 'rxjs';
import { Turno } from '../../../models/turno';
import { HistoriaClinicaComponent } from '../../../components/historia-clinica/historia-clinica.component';
import { PdfService } from '../../../services/pdf.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, JsonPipe, HistoriaClinicaComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  fire = inject(FirebaseService);
  user = inject(AuthService);
  pdf = inject(PdfService);
  decoration = 'm-3 text-primary text-decoration-underline';
  decoration2 = 'm-3 text-primary';
  perfil = true;

  clickHistorial() {
    if (this.perfil) {
      const aux = this.decoration;
      this.decoration = this.decoration2;
      this.decoration2 = aux;
      this.perfil = false;
    }
  }

  clickPefil() {
    if (!this.perfil) {
      const aux = this.decoration2;
      this.decoration2 = this.decoration;
      this.decoration = aux;
      this.perfil = true;
    }
  }

  exportToPDF() {
    this.pdf.exportToPDF();
  }
}
