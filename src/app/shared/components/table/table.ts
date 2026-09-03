import {Component, input, output} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import type {TableLazyLoadEvent} from 'primeng/table';
import {Button} from 'primeng/button';
import {Tag} from 'primeng/tag';

export interface TableBadge {
  field: string;
  label: string;
}

export interface InstallmentField {
  number: string;
  total: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrl: './table.scss',
  standalone: true,
  imports: [
    CurrencyPipe,
    TableModule,
    DatePipe,
    Button,
    Tag
  ],
})
export class Table {

  values = input<any[]>([]);

  headers = input<string[]>([]);

  fields = input<string[]>([]);

  title = input<string>('');

  totalRecords = input<number>(0);

  rows = input<number>(10);

  // Optional boolean flags shown as small tags next to the first column's value.
  badges = input<TableBadge[]>([]);

  // Optional "n/total" tag (e.g. installment "2/24") shown next to the first column's value.
  installmentField = input<InstallmentField | null>(null);

  deleteItem = output<string>();

  editItem = output<string>();

  pageChange = output<{ page: number; size: number }>();

  protected delete(id: string) {
    this.deleteItem.emit(id);
  }

  protected edit(id: string) {
    this.editItem.emit(id);
  }

  protected onLazyLoad(event: TableLazyLoadEvent) {
    const size = event.rows ?? this.rows();
    const page = Math.floor((event.first ?? 0) / size);
    this.pageChange.emit({page, size});
  }
}
