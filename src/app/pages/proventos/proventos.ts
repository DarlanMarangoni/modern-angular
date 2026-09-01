import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {InputNumber} from 'primeng/inputnumber';
import {FloatLabel} from 'primeng/floatlabel';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {Provento, ProventosService} from '../../shared/service/proventos.service';
import {Table} from '../../shared/components/table/table';

@Component({
  selector: 'app-proventos',
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
  templateUrl: './proventos.html',
  styleUrl: './proventos.scss',
})
export class Proventos implements OnInit {
  fb = inject(FormBuilder);

  proventosService = inject(ProventosService);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    descricao: [''],
    data: [new Date(), Validators.required],
    valor: [0, [Validators.required]]
  });

  tipos = signal<String[]>([]);

  proventos = signal<Provento[]>([]);

  ngOnInit(): void {
    this.tipos = signal(['Acoes', 'Fundo Imobiliario', 'Renda Fixa']);
    this.buscaProventos();
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.proventosService.salvar({
      id: null,
      name: this.form.getRawValue().nome,
      description: this.form.getRawValue().descricao,
      value: this.form.getRawValue().valor,
      date: this.form.getRawValue().data.toLocaleDateString('en-CA', {
        timeZone: 'America/Sao_Paulo'
      }),
      type: this.form.getRawValue().tipo,
      userId: '0199812b-ee85-74a1-8bb3-05d2185f93fc'
    }).subscribe({
      next: () => {
        this.form.reset({
          nome: ' ',
          tipo: ' ',
          descricao: '',
          data: new Date(),
          valor: 0
        });
        this.form.clearValidators();

        this.buscaProventos();
      },
      error: () => alert('Erro ao salvar')
    });

  }

  protected deleteById($event: any) {
    this.proventosService.deleteById($event).subscribe({
      next: () => this.buscaProventos(),
      error: () => alert('Erro ao deletar')
    });
    this.buscaProventos();
  }

  private buscaProventos() {
    this.proventosService.findAll()
      .subscribe({
        next: value => {
          this.proventos.set(value);
        },
        error: () => alert('Erro ao carregar despesas')
      });
  }
}
