import {Component, input, output, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-child',
  styles: `
    .btn {
      padding: 5px;
    }
  `,
  template: `
    <button class="btn" (click)="addItem()">Add Item</button> `,
})
export class Child {
  readonly addItemEvent = output<String>();

  addItem() {
    this.addItemEvent.emit('🐢');
  }

}

@Component({
  selector: 'app-root',
  template: `
    <section (mouseover)="showSecretMessage()" (mouseleave)="hideMessage()">
      There's a secret message for you, hover to reveal 👀
      {{ message }}
    </section>
    <app-child (addItemEvent)="addItem($event)" />
    {{ items }}
  `,
  imports: [Child],
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('personal-finance-app');

  items = new Array<String>();

  addItem(item: String) {
    this.items.push(item);
    console.log(this.items);
  }

  message = '';

  showSecretMessage() {
    this.message = 'Way to go 🚀';
  }

  hideMessage() {
    this.message = '';
  }
}
