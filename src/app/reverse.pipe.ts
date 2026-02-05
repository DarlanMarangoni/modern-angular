import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'reverse'})
export class ReversePipe implements PipeTransform {
    transform(value: any) {
      let reversed = '';
      for (let i = value.length - 1; i >= 0; i--) {
        reversed += value[i];
      }
      return reversed;
    }

}
