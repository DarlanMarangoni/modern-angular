import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CURRENT_USER_ID} from '../current-user';
import {PageResponse} from '../page-response';

export interface Provento {
  id: string | null;
  name: string;
  description: string;
  type: string;
  value: number;
  date: string;
  userId: string;
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
  private readonly API = 'http://darlan-ms-7e24.tail547bb5.ts.net:8082/income';

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
    return this.http.get<YearMonth[]>(`${this.API}/${CURRENT_USER_ID}/listByMonth`);
  }

  findAll(page: number, size: number = 10) {
    return this.http.get<PageResponse<Provento>>(`${this.API}`, {params: {page, size}});
  }

  deleteById(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
