import {Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {Investimentos} from './pages/investimentos/investimentos';
import {Proventos} from './pages/proventos/proventos';
import {authGuard} from './shared/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Entrar',
    loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.Login)
  },
  {
    path: '',
    title: 'App Home Page',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'despesas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/despesas/despesas')
        .then(m => m.Despesas)
  },
  {
    path: 'investimentos',
    title: 'App Investimentos',
    component: Investimentos,
    canActivate: [authGuard],
  },
  {
    path: 'proventos',
    title: 'App Proventos',
    component: Proventos,
    canActivate: [authGuard],
  }

];
