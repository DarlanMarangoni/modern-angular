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

@Injectable({
  providedIn: 'root',
})
export class DespesasService {

  private http = inject(HttpClient);
  private readonly API = 'http://192.168.3.17:8081/expenses';

  salvar(despesa: Despesa) {
    return this.http.post(this.API, despesa);
  }

}
