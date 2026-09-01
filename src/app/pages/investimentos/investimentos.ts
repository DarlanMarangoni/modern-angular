import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {InputNumber} from 'primeng/inputnumber';
import {FloatLabel} from 'primeng/floatlabel';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {Investimento, InvestimentosServices} from '../../shared/service/investimentos.services';
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

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    descricao: [''],
    data: [new Date(), Validators.required],
    valor: [0],
    quantidade: [0]
  });

  tipos = signal<String[]>([]);

  investimentos = signal<Investimento[]>([]);

  ngOnInit(): void {
    this.tipos = signal(['Acoes', 'Fundo Imobiliario', 'Renda Fixa', 'Previdencia Privada', 'CDB', 'FGTS', 'Tesouro Direto', 'Fundo de Investimento']);

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
      userId: '0199812b-ee85-74a1-8bb3-05d2185f93fc'
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
      error: () => alert('Erro ao salvar')
    });
  }

  protected deleteById($event: any) {
    this.investimentosService.deleteById($event).subscribe({
      next: () => this.buscaInvestimentos(),
      error: () => alert('Erro ao deletar')
    })
  }

  private buscaInvestimentos() {
    this.investimentosService.findAll()
      .subscribe({
        next: value => {
          this.investimentos.set(value);
        },
        error: () => alert('Erro ao carregar despesas')
      });
  }
}
