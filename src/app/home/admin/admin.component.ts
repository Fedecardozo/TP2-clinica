import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { slideUpAnimation } from '../../utils/animation';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  animations: [slideUpAnimation],
})
export class AdminComponent {
  constructor() {}
}
