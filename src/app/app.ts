import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  template: `
    @if (isLoggedIn) {
      <p>Welcome back, Friend!</p>
    }
    @if (isServerRunning) {
      <span>Yes, the server is running.</span>
    } @else {
      <span>No, the server is not running.</span>
    }
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('personal-finance-app');

  isLoggedIn = true;
  isServerRunning = true;
}
