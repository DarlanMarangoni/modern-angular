import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageResponse} from '../page-response';
import {EXPENSE_API_BASE} from '../api-config';

export interface ExpenseDto {
  name: string;
  category: string;
  description: string;
  value: number;
  date: Date;
  fixed: boolean;
  recurring: boolean;
}

export interface FinancedExpenseDto {
  name: string;
  category: string;
  description: string;
  totalValue: number;
  installments: number;
  startDate: string;
}

export interface Despesa {
  id: string;
  name: string;
  description: string;
  value: number;
  date: Date;
  category: number;
  created: string;
  updated: string;
  fixed: boolean;
  recurring: boolean;
  installmentNumber: number | null;
  totalInstallments: number | null;
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
  private readonly API = `${EXPENSE_API_BASE}/expenses`;

  salvar(despesa: ExpenseDto) {
    return this.http.post(this.API, despesa);
  }

  financiar(despesa: FinancedExpenseDto) {
    return this.http.post<Despesa[]>(`${this.API}/financed`, despesa);
  }

  update(id: string, despesa: ExpenseDto) {
    return this.http.put<Despesa>(`${this.API}/${id}`, despesa);
  }

  findById(id: string) {
    return this.http.get<Despesa>(`${this.API}/${id}`);
  }

  listByMonth() {
    return this.http.get<ExpenseYearMonth[]>(`${this.API}/listByMonth`);
  }

  findAll(page: number, size: number = 10) {
    return this.http.get<PageResponse<Despesa>>(`${this.API}`, {params: {page, size}});
  }

  deleteById(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

}
