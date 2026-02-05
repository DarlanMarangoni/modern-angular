import {Component, inject} from '@angular/core';
import {CarService} from './car.service';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';
import {ReversePipe} from './reverse.pipe';


@Component({
  selector: 'app-root',
  template: `
    <li>Number with "decimal": {{ num | number: '3.2-2' }}</li>
    <li>Date with "date": {{ birthday | date: 'medium' }}</li>
    <li>Currency with "currency": {{ cost | currency }}</li>
    <li>Reverse pipe on "Darlan": {{ 'Darlan' | reverse }}</li>
  `,
  imports: [
    DecimalPipe,
    DatePipe,
    CurrencyPipe,
    ReversePipe
  ],
})
export class App {

  carService = inject(CarService);

  num = 1234567.89;
  birthday = new Date();
  cost = 1.99;

}
