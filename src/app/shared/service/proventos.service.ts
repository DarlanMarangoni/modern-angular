import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Provento {
  id: string | null;
  name: string;
  description: string;
  type: string;
  value: number;
  date: string;
  userId: string;
}

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
    console.log(provento);
    return this.http.post(`${this.API}/createMany`, [provento]);
  }

  listByMonth() {
    return this.http.get<YearMonth[]>(`${this.API}/0199812b-ee85-74a1-8bb3-05d2185f93fc/listByMonth`);
  }

  findAll() {
    return this.http.get<Provento[]>(`${this.API}`);
  }

  deleteById(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
