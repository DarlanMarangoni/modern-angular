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
import {Checkbox} from 'primeng/checkbox';
import {MessageService} from 'primeng/api';
import {Category, CategoryService} from '../../shared/service/category.service';
import {Despesa, DespesasService, ExpenseDto, FinancedExpenseDto} from '../../shared/service/despesas.service';
import {InstallmentField, Table, TableBadge} from '../../shared/components/table/table';

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
    Checkbox,
    Table
  ],
  templateUrl: './despesas.html',
  styleUrls: ['./despesas.scss']
})
export class Despesas implements OnInit {

  fb = inject(FormBuilder);
  categoriesService = inject(CategoryService);
  despesasService = inject(DespesasService);
  messageService = inject(MessageService);

  protected readonly badges: TableBadge[] = [
    {field: 'fixed', label: 'Fixa'},
    {field: 'recurring', label: 'Recorrente'}
  ];

  protected readonly installmentField: InstallmentField = {number: 'installmentNumber', total: 'totalInstallments'};

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    categoria: ['', Validators.required],
    descricao: [''],
    data: [new Date(), Validators.required],
    valor: [0, [Validators.required]],
    fixa: [false],
    recorrente: [false],
    parcelado: [false],
    valorTotal: [0],
    parcelas: [1],
    dataPrimeiraParcela: [new Date()]
  });

  categorias = signal<Category[]>([]);

  despesas = signal<Despesa[]>([]);

  page = signal(0);

  totalRecords = signal(0);

  editingId = signal<string | null>(null);

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe({
        next: (categories) => {
          this.categorias.set(categories);
        },
        error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar categorias'})
      });

    this.buscaDespesas();
  }

  protected onPageChange({page, size}: { page: number; size: number }) {
    this.buscaDespesas(page, size);
  }

  private buscaDespesas(page = this.page(), size = 10) {
    this.despesasService.findAll(page, size)
      .subscribe({
        next: response => {
          this.despesas.set(response.content);
          this.totalRecords.set(response.totalElements);
          this.page.set(response.page);
        },
        error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar despesas'})
      });
  }

  salvar() {
    if (!this.editingId() && this.form.getRawValue().parcelado) {
      this.financiar();
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dto: ExpenseDto = {
      name: this.form.getRawValue().nome.trim(),
      category: this.form.getRawValue().categoria.trim(),
      date: this.form.getRawValue().data,
      description: this.form.getRawValue().descricao,
      value: this.form.getRawValue().valor,
      fixed: this.form.getRawValue().fixa,
      recurring: this.form.getRawValue().recorrente
    };

    const request = this.editingId()
      ? this.despesasService.update(this.editingId()!, dto)
      : this.despesasService.salvar(dto);

    request.subscribe({
      next: () => {
        this.cancelarEdicao();
        this.buscaDespesas();
      },
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao salvar despesa'})
    });
  }

  private financiar() {
    const {nome, categoria, descricao, valorTotal, parcelas, dataPrimeiraParcela} = this.form.getRawValue();
    if (!nome.trim() || !categoria.trim() || !valorTotal || parcelas < 1) {
      this.form.markAllAsTouched();
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Preencha nome, categoria, valor total e número de parcelas'});
      return;
    }

    const dto: FinancedExpenseDto = {
      name: nome.trim(),
      category: categoria.trim(),
      description: descricao,
      totalValue: valorTotal,
      installments: parcelas,
      startDate: dataPrimeiraParcela.toLocaleDateString('en-CA', {timeZone: 'America/Sao_Paulo'})
    };

    this.despesasService.financiar(dto).subscribe({
      next: () => {
        this.cancelarEdicao();
        this.buscaDespesas();
      },
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao financiar compra'})
    });
  }

  protected editar(id: string) {
    this.despesasService.findById(id).subscribe({
      next: despesa => {
        const categoria = this.categorias().find(c => c.id === despesa.category)?.name ?? '';
        this.form.setValue({
          nome: despesa.name,
          categoria,
          descricao: despesa.description ?? '',
          // despesa.date is a plain 'yyyy-MM-dd' string — parse as local midnight, not UTC,
          // or the datepicker shows the previous day for timezones behind UTC.
          data: new Date(`${despesa.date}T00:00:00`),
          valor: despesa.value,
          fixa: despesa.fixed,
          recorrente: despesa.recurring,
          parcelado: false,
          valorTotal: 0,
          parcelas: 1,
          dataPrimeiraParcela: new Date()
        });
        this.editingId.set(id);
      },
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar despesa'})
    });
  }

  protected cancelarEdicao() {
    this.form.reset({
      nome: ' ',
      categoria: ' ',
      descricao: '',
      data: new Date(),
      valor: 0,
      fixa: false,
      recorrente: false,
      parcelado: false,
      valorTotal: 0,
      parcelas: 1,
      dataPrimeiraParcela: new Date()
    });
    this.form.clearValidators();
    this.editingId.set(null);
  }

  protected deleteById(id: string) {
    this.despesasService.deleteById(id).subscribe({
      next: () => this.buscaDespesas(),
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao deletar despesa'})
    })
  }
}
