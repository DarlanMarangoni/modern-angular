import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

  private http = inject(HttpClient);
  private readonly API = 'http://darlan-ms-7e24.tail547bb5.ts.net:8082/investments/createMany';

  salvar(investimento: Investimento) {
    console.log(investimento);
    return this.http.post(this.API, [investimento]);
  }

}
