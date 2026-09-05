import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {InputNumber} from 'primeng/inputnumber';
import {FloatLabel} from 'primeng/floatlabel';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {Investimento, InvestimentosServices, InvestmentDto} from '../../shared/service/investimentos.services';
import {Table} from '../../shared/components/table/table';

@Component({
  selector: 'app-investimentos',
  imports: [
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
  templateUrl: './investimentos.html',
  styleUrl: './investimentos.scss',
  standalone: true
})
export class Investimentos implements OnInit{
  fb = inject(FormBuilder);

  investimentosService = inject(InvestimentosServices);

  messageService = inject(MessageService);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    descricao: [''],
    data: [new Date(), Validators.required],
    valor: [0],
    quantidade: [0]
  });

  tipos = signal<string[]>([]);

  investimentos = signal<Investimento[]>([]);

  page = signal(0);

  totalRecords = signal(0);

  editingId = signal<string | null>(null);

  ngOnInit(): void {
    this.tipos.set(['Acoes', 'Fundo Imobiliario', 'Renda Fixa', 'Previdencia Privada', 'CDB', 'FGTS', 'Tesouro Direto', 'Fundo de Investimento']);

    this.buscaInvestimentos();
  }

  protected onPageChange({page, size}: { page: number; size: number }) {
    this.buscaInvestimentos(page, size);
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nome = this.form.getRawValue().nome;
    const descricao = this.form.getRawValue().descricao;
    const tipo = this.form.getRawValue().tipo;
    const valor = this.form.getRawValue().valor;
    const quantidade = this.form.getRawValue().quantidade;
    const data = this.form.getRawValue().data;

    const editingId = this.editingId();
    const request = editingId
      ? this.investimentosService.update(editingId, {
        name: nome,
        description: descricao,
        type: tipo,
        totalValue: valor,
        // unitValue isn't collected by this form — it's derivable from the two fields we do have.
        unitValue: quantidade ? valor / quantidade : 0,
        amount: quantidade,
        date: data
      } satisfies InvestmentDto)
      : this.investimentosService.salvar({
        name: nome,
        description: descricao,
        type: tipo,
        totalValue: valor,
        amount: quantidade,
        date: data
      });

    request.subscribe({
      next: () => {
        this.cancelarEdicao();
        this.buscaInvestimentos();
      },
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao salvar investimento'})
    });
  }

  protected editar(id: string) {
    this.investimentosService.findById(id).subscribe({
      next: investimento => {
        this.form.setValue({
          nome: investimento.name,
          tipo: investimento.type,
          descricao: investimento.description ?? '',
          // investimento.date is a plain 'yyyy-MM-dd' string — parse as local midnight, not UTC,
          // or the datepicker shows the previous day for timezones behind UTC.
          data: new Date(`${investimento.date}T00:00:00`),
          valor: investimento.totalValue,
          quantidade: investimento.amount
        });
        this.editingId.set(id);
      },
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar investimento'})
    });
  }

  protected cancelarEdicao() {
    this.form.reset({
      nome: ' ',
      tipo: ' ',
      descricao: '',
      data: new Date(),
      valor: 0,
      quantidade: 0
    });
    this.form.clearValidators();
    this.editingId.set(null);
  }

  protected deleteById(id: string) {
    this.investimentosService.deleteById(id).subscribe({
      next: () => this.buscaInvestimentos(),
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao deletar investimento'})
    })
  }

  private buscaInvestimentos(page = this.page(), size = 10) {
    this.investimentosService.findAll(page, size)
      .subscribe({
        next: response => {
          this.investimentos.set(response.content);
          this.totalRecords.set(response.totalElements);
          this.page.set(response.page);
        },
        error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar investimentos'})
      });
  }
}
