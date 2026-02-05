import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CarService} from './car.service';


@Component({
  selector: 'app-root',
  template: `
    template: \`<p>Car Listing: {{ display }}</p>\`,
  `,
  imports: [
    ReactiveFormsModule
  ],
})
export class App {

  carService = inject(CarService);

  display = this.carService.getCars().join(' ⭐️ ');

}
