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
import {Investimento, InvestimentosServices} from '../../shared/service/investimentos.services';
import {Table} from '../../shared/components/table/table';
import {CURRENT_USER_ID} from '../../shared/current-user';

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

  ngOnInit(): void {
    this.tipos.set(['Acoes', 'Fundo Imobiliario', 'Renda Fixa', 'Previdencia Privada', 'CDB', 'FGTS', 'Tesouro Direto', 'Fundo de Investimento']);

    this.buscaInvestimentos();
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.investimentosService.salvar({
      name: this.form.getRawValue().nome,
      description: this.form.getRawValue().descricao,
      type: this.form.getRawValue().tipo,
      totalValue: this.form.getRawValue().valor,
      amount: this.form.getRawValue().quantidade,
      date: this.form.getRawValue().data,
      userId: CURRENT_USER_ID
    }).subscribe({
      next: () => {
        this.form.reset({
          nome: ' ',
          tipo: ' ',
          descricao: '',
          data: new Date(),
          valor: 0,
          quantidade: 0
        });
        this.form.clearValidators();

        this.buscaInvestimentos();

      },
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao salvar investimento'})
    });
  }

  protected deleteById(id: string) {
    this.investimentosService.deleteById(id).subscribe({
      next: () => this.buscaInvestimentos(),
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao deletar investimento'})
    })
  }

  private buscaInvestimentos() {
    this.investimentosService.findAll()
      .subscribe({
        next: value => {
          this.investimentos.set(value);
        },
        error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar investimentos'})
      });
  }
}
