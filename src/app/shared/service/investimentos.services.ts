import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {YearMonth} from './proventos.service';
import {CURRENT_USER_ID} from '../current-user';

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
    return this.http.post(`${this.API}/createMany`, [investimento]);
  }

  listByMonth() {
    return this.http.get<YearMonth[]>(`${this.API}/${CURRENT_USER_ID}/listByMonth`);
  }

  findAll() {
    return this.http.get<Investimento[]>(`${this.API}`);
  }

  deleteById(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

}
