import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  template: `
    <div [contentEditable]="isEditable"></div>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('personal-finance-app');

  isEditable = true;
}
