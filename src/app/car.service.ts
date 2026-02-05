import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  getCars() {
    return ['BMW', 'Ford', 'Volvo'];
  }
}
