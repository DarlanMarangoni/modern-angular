import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-user',
  template: `
    <p>Username: {{ username }}</p>
    <p>Preferred Framework:</p>
    <ul>
      <li>
        Static Image:
        <img ngSrc="hommer.jpeg" alt="Angular logo" width="225" height="225"/>
      </li>
      <li>
        Dynamic Image:
        <img [ngSrc]="logoUrl" [alt]="logoAlt" width="32" height="32"/>
      </li>
    </ul>
  `,
  imports: [NgOptimizedImage],
})
export class User {
  logoUrl = 'hommer.jpeg';
  logoAlt = 'Angular logo';
  username = 'youngTech';
}



@Component({
  selector: 'app-root',
  template: `
    <app-user />
  `,
  imports: [
    User
  ],
})
export class App {
}
