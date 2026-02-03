import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  template: `
    <app-user />
  `,
  imports: [
    RouterOutlet
  ],
})
export class App {
}
