import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {PageResponse} from '../page-response';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private http = inject(HttpClient);
  private readonly API = 'http://darlan-ms-7e24.tail547bb5.ts.net:8081/categories';

  getCategories() {
    // The dropdown needs every category, not just one page — 100 comfortably covers
    // today's 26 and is the backend's documented max page size.
    return this.http.get<PageResponse<Category>>(this.API, {params: {size: 100}})
      .pipe(map(response => response.content));
  }
}
