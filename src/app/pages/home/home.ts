import {Component, inject, OnInit, signal} from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {MessageService} from 'primeng/api';
import {ProventosService, YearMonth} from '../../shared/service/proventos.service';
import {InvestimentosServices} from '../../shared/service/investimentos.services';
import {DespesasService} from '../../shared/service/despesas.service';

@Component({
  selector: 'app-home',
  imports: [
    ChartModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class Home implements OnInit {

  proventosService = inject(ProventosService);

  investimentoService = inject(InvestimentosServices);

  despesasService = inject(DespesasService);

  messageService = inject(MessageService);

  proventosData=  signal<any>({});

  investimentosData=  signal<any>({});

  despesasData=  signal<any>({});

  proventosOptions: any;

  investimentosOptions: any;

  despesasOptions: any;

  ngOnInit() {

    this.proventosService.listByMonth()
      .subscribe({
        next: (proventos) => {
          const labels: string[] = [];
          const datasets = [{
            label: 'Proventos',
            data: []
          }];
          proventos.forEach(p => {
            labels.push(p.month);
            datasets[0].label = 'Proventos';
            // @ts-ignore
            datasets[0].data.push(p.value);
          });
          this.proventosData.set({labels, datasets});
        }, error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar proventos'})
      });

    this.investimentoService.listByMonth()
      .subscribe({
        next: (investimentos) => {
          const labels: string[] = [];
          const datasets = [{
            label: 'Proventos',
            data: []
          }];
          investimentos.forEach(p => {
            labels.push(p.month);
            datasets[0].label = 'Investimentos';
            // @ts-ignore
            datasets[0].data.push(p.value);
          });
          this.investimentosData.set({
            labels,
            datasets
          });
        }, error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar investimentos'})
      });

    this.despesasService.listByMonth()
      .subscribe({
        next: (despesas) => {
          const labels: string[] = [];
          const datasets = [{
            label: 'Proventos',
            data: []
          }];
          despesas.forEach(p => {
            labels.push(p.month);
            datasets[0].label = 'Despesas';
            // @ts-ignore
            datasets[0].data.push(p.total);
          });
          this.despesasData.set({
            labels,
            datasets
          });
        }, error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar despesas'})
      });

    this.proventosOptions = {
      responsive: true,
      maintainAspectRatio: false,
      backgroundColor: 'rgba(6, 182, 212, 0.2)',
      borderColor: 'rgba(6, 182, 212)',
      borderWidth: 1
    };

    this.investimentosOptions = {
      responsive: true,
      maintainAspectRatio: false,
      backgroundColor: 'rgb(107, 114, 128, 0.2)',
      borderColor: 'rgb(107, 114, 128)',
      borderWidth: 1
    };

    this.despesasOptions = {
      responsive: true,
      maintainAspectRatio: false,
      backgroundColor: 'rgba(249, 115, 22, 0.2)',
      borderColor: 'rgba(249, 115, 22)',
      borderWidth: 1
    };
  }
}
