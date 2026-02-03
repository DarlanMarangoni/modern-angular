import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  template: `

    <section (mouseover)="showSecretMessage()" (mouseleave)="hideMessage()">
      There's a secret message for you, hover to reveal 👀
      {{ message }}
    </section>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('personal-finance-app');

  message = '';

  showSecretMessage() {
    this.message = 'Way to go 🚀';
  }
  hideMessage() {
    this.message = '';
  }
}
