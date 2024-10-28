import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtilsService } from './services/utils.service';

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
}
