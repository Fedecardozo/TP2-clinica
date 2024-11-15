import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { slideUpAnimation } from '../utils/animation';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [slideUpAnimation],
})
export class HomeComponent {}
