import {Injectable} from '@angular/core';

export interface Provento {
  id: string | null;
  name: string;
  description: string;
  type: string;
  value: number;
  date: Date;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProventosService {

  salvar(provento: Provento) {
    console.log(provento);
  }

}
