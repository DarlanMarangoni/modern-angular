import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {YearMonth} from './proventos.service';
import {CURRENT_USER_ID} from '../current-user';
import {PageResponse} from '../page-response';

export interface Investimento {
  id?: string;
  name: string;
  description: string;
  type: string;
  totalValue: number;
  amount: number;
  date: Date;
  userId: string;
}

export interface InvestmentDto {
  name: string;
  type: string;
  description: string;
  unitValue: number;
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

  update(id: string, investimento: InvestmentDto) {
    return this.http.put<Investimento>(`${this.API}/${id}`, investimento);
  }

  findById(id: string) {
    return this.http.get<Investimento>(`${this.API}/${id}`);
  }

  listByMonth() {
    return this.http.get<YearMonth[]>(`${this.API}/${CURRENT_USER_ID}/listByMonth`);
  }

  findAll(page: number, size: number = 10) {
    return this.http.get<PageResponse<Investimento>>(`${this.API}`, {params: {page, size}});
  }

  deleteById(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

}
