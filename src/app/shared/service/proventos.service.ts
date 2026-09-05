import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageResponse} from '../page-response';
import {INVESTMENT_API_BASE} from '../api-config';

export interface Provento {
  id: string | null;
  name: string;
  description: string;
  type: string;
  value: number;
  date: string;
}

export type IncomeDto = Omit<Provento, 'id'>;

export interface YearMonth {
  month: string;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProventosService {

  private http = inject(HttpClient);
  private readonly API = `${INVESTMENT_API_BASE}/income`;

  salvar(provento: Provento) {
    return this.http.post(`${this.API}/createMany`, [provento]);
  }

  update(id: string, provento: IncomeDto) {
    return this.http.put<Provento>(`${this.API}/${id}`, provento);
  }

  findById(id: string) {
    return this.http.get<Provento>(`${this.API}/${id}`);
  }

  listByMonth() {
    return this.http.get<YearMonth[]>(`${this.API}/listByMonth`);
  }

  findAll(page: number, size: number = 10) {
    return this.http.get<PageResponse<Provento>>(`${this.API}`, {params: {page, size}});
  }

  deleteById(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
