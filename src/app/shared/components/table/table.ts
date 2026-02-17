import {Component, input, output} from '@angular/core';
import {Despesa} from '../../service/despesas.service';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrl: './table.scss',
  standalone: true,
  imports: [
    CurrencyPipe,
    TableModule,
    DatePipe,
    Button
  ],
})
export class Table {

  values = input<any[]>([]);

  headers = input<string[]>([]);

  fields = input<string[]>([]);

  title = input<string>('');

  deleteItem = output<string>();

  protected delete(id: string) {
    this.deleteItem.emit(id);
  }
}
