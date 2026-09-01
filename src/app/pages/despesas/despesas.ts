import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {InputNumber} from 'primeng/inputnumber';
import {FloatLabel} from 'primeng/floatlabel';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {Category, CategoryService} from '../../shared/service/category.service';
import {Despesa, DespesasService} from '../../shared/service/despesas.service';
import {Table} from '../../shared/components/table/table';

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    Select,
    DatePicker,
    InputNumber,
    FloatLabel,
    Message,
    Button,
    Table
  ],
  templateUrl: './despesas.html',
  styleUrls: ['./despesas.scss']
})
export class DespesasComponent implements OnInit {

  fb = inject(FormBuilder);
  categoriesService = inject(CategoryService);
  despesasService = inject(DespesasService);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    categoria: ['', Validators.required],
    descricao: [''],
    data: [new Date(), Validators.required],
    valor: [0, [Validators.required]]
  });

  categorias = signal<Category[]>([]);

  despesas = signal<Despesa[]>([]);

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe({
        next: (categories) => {
          this.categorias.set(categories);
        },
        error: () => alert('Erro ao carregar categorias')
      });

    this.buscaDespesas();
  }

  private buscaDespesas() {
    this.despesasService.findAll()
      .subscribe({
        next: value => {
          this.despesas.set(value);
        },
        error: () => alert('Erro ao carregar despesas')
      });
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.despesasService.salvar({
      id: null,
      name: this.form.getRawValue().nome.trim(),
      category: this.form.getRawValue().categoria.trim(),
      date: this.form.getRawValue().data,
      description: this.form.getRawValue().descricao,
      value: this.form.getRawValue().valor
    }).subscribe({
      next: () => {
        this.form.reset({
          nome: ' ',
          categoria: ' ',
          descricao: '',
          data: new Date(),
          valor: 0
        });
        this.form.clearValidators();
        this.buscaDespesas();
      },
      error: () => alert('Erro ao salvar')
    });
  }

  protected deleteById($event: any) {
    this.despesasService.deleteById($event).subscribe({
      next: () => this.buscaDespesas(),
      error: () => alert('Erro ao deletar')
    })
  }
}
