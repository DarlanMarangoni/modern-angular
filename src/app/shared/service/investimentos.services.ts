import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Provento, YearMonth} from './proventos.service';

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
  private readonly API = 'http://darlan-ms-7e24.tail547bb5.ts.net:8082/investments';

  salvar(investimento: Investimento) {
    console.log(investimento);
    return this.http.post(`${this.API}/createMany`, [investimento]);
  }

  listByMonth() {
    return this.http.get<YearMonth[]>(`${this.API}/0199812b-ee85-74a1-8bb3-05d2185f93fc/listByMonth`);
  }

  findAll() {
    return this.http.get<Investimento[]>(`${this.API}`);
  }

  deleteById(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

}
