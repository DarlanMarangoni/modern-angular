import {Component, inject} from '@angular/core';
import {CarService} from './car.service';
import {UpperCasePipe} from '@angular/common';


@Component({
  selector: 'app-root',
  template: `
    template: \`<p>Car Listing: {{ display | uppercase}}</p>\`,
  `,
  imports: [
    UpperCasePipe
  ],
})
export class App {

  carService = inject(CarService);

  display = this.carService.getCars().join(' ⭐️ ');

}
