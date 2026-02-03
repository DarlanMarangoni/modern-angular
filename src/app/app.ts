import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  template: `
    @for (os of operatingSystem; track os.id) {
      {{ os.id }}
    }
    @for (user of users; track user.id) {
      {{ user.name }}
    }
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('personal-finance-app');

  operatingSystem = [
    {id: 'win', name: 'Windows'},
    {id: 'linux', name: 'Linux'},
    {id: 'osx', name: 'Mac OS'}
  ];

  users =[
    {id: 1, name: 'John'},
    {id: 2, name: 'Jane'},
    {id: 3, name: 'Bob'},
    {id: 3, name: 'Leo'},
    {id: 3, name: 'Vanessa'},
    {id: 3, name: 'Darlan'}
  ];
}
