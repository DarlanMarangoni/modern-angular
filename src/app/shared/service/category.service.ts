import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {PageResponse} from '../page-response';
import {EXPENSE_API_BASE} from '../api-config';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private http = inject(HttpClient);
  private readonly API = `${EXPENSE_API_BASE}/categories`;

  getCategories() {
    // The dropdown needs every category, not just one page — 100 comfortably covers
    // today's 26 and is the backend's documented max page size.
    return this.http.get<PageResponse<Category>>(this.API, {params: {size: 100}})
      .pipe(map(response => response.content));
  }
}
