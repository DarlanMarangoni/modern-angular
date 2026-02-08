import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private http = inject(HttpClient);
  private readonly API = 'http://192.168.3.17:8081/categories';

  getCategories() {
    return this.http.get<Category[]>(this.API);
  }
}
