import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Investimentos} from './investimentos/investimentos';
import {Proventos} from './proventos/proventos';

export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    component: Home,
  },
  {
    path: 'despesas',
    loadComponent: () =>
      import('./pages/despesas/despesas')
        .then(m => m.DespesasComponent)
  },
  {
    path: 'investimentos',
    title: 'App Investimentos',
    component: Investimentos,
  },
  {
    path: 'proventos',
    title: 'App Proventos',
    component: Proventos,
  }

];
