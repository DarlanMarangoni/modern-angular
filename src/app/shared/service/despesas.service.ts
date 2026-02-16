import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Despesa {
  id: string | null;
  name: string;
  description: string;
  value: number;
  date: Date;
  category: String;
}

export interface ExpenseYearMonth {
  month: string;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class DespesasService {

  private http = inject(HttpClient);
  private readonly API = 'http://darlan-ms-7e24.tail547bb5.ts.net:8081/expenses';

  salvar(despesa: Despesa) {
    return this.http.post(this.API, despesa);
  }

  listByMonth() {
    return this.http.get<ExpenseYearMonth[]>(`${this.API}`);
  }

  findAll() {
    return this.http.get<Despesa[]>(`${this.API}`);
  }

  deleteById(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

}
