import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {YearMonth} from './proventos.service';
import {PageResponse} from '../page-response';
import {INVESTMENT_API_BASE} from '../api-config';

export interface Investimento {
  id?: string;
  name: string;
  description: string;
  type: string;
  totalValue: number;
  amount: number;
  date: Date;
}

export interface InvestmentDto {
  name: string;
  type: string;
  description: string;
  unitValue: number;
  totalValue: number;
  amount: number;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class InvestimentosServices {

  private http = inject(HttpClient);
  private readonly API = `${INVESTMENT_API_BASE}/investments`;

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
    return this.http.get<YearMonth[]>(`${this.API}/listByMonth`);
  }

  findAll(page: number, size: number = 10) {
    return this.http.get<PageResponse<Investimento>>(`${this.API}`, {params: {page, size}});
  }

  deleteById(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

}
