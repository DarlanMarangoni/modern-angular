import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-user',
    template: `Username: {{ username }}`,
  }
)
export class User {
  username = 'Darlan';
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, User],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('personal-finance-app');

  city = 'San Francisco';
}
