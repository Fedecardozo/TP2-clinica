import { Component, inject } from '@angular/core';
import { slideUpAnimation } from '../../../utils/animation';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../../../services/firebase.service';
import { TitleCasePipe } from '@angular/common';
import { BarraComponent } from './barra/barra.component';
import { LineComponent } from './line/line.component';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [TitleCasePipe, BarraComponent, LineComponent],
  animations: [slideUpAnimation],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css',
})
export class GraficosComponent {
  sub?: Subscription;
  fire = inject(FirebaseService);
  logs: any[] = [];
  th: string[] = [];

  constructor() {
    this.th = ['Correo', 'Nombre', 'Apellido', 'Fecha', 'Dia', 'Horario'];
  }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs() {
    this.sub = this.fire
      .getCollection('logs')
      .valueChanges()
      .subscribe((next) => {
        this.logs = next;
      });
  }

  ngAfterViewChecked(): void {
    const scroll = document.getElementById('scroll');
    if (scroll !== null) {
      scroll.scrollTo({
        top: scroll.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
}
