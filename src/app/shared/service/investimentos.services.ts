import {Injectable} from '@angular/core';

export interface Investimento {
  name: string;
  description: string;
  type: string;
  totalValue: number;
  amount: number;
  date: Date;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class InvestimentosServices {

  salvar(investimento: Investimento) {
    console.log(investimento);
  }

}
