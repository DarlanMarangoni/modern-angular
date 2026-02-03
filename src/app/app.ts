import {Component, input, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-user',
    template: `<p>The user's name is {{ name() }}</p>`
  }
)
export class User {
  name = input<String>();
}


@Component({
  selector: 'app-root',
  template: `

    <section (mouseover)="showSecretMessage()" (mouseleave)="hideMessage()">
      There's a secret message for you, hover to reveal 👀
      {{ message }}
    </section>
    <app-user name="Darlan"/>
  `,
  imports: [User],
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
