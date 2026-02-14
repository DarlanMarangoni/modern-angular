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

@Injectable({
  providedIn: 'root',
})
export class ProventosService {

  private http = inject(HttpClient);
  private readonly API = 'http://darlan-ms-7e24.tail547bb5.ts.net:8082/income/createMany';

  salvar(provento: Provento) {
    console.log(provento);
    return this.http.post(this.API, [provento]);
  }

}
