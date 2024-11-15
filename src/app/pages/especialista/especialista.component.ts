import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { slideUpAnimation } from '../../utils/animation';

@Component({
  selector: 'app-especialista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './especialista.component.html',
  styleUrl: './especialista.component.css',
  animations: [slideUpAnimation],
})
export class EspecialistaComponent {}
