import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { isDemoMode } from './core/api.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly demo = isDemoMode();
}
