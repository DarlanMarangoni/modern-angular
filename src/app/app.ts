import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    RouterOutlet,
    MenubarModule
  ]
})
export class App implements OnInit {
  protected items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'Despesas',
        icon: 'pi pi-home'
      },
      {
        label: 'Proventos',
        icon: 'pi pi-home'
      },
      {
        label: 'Investimentos',
        icon: 'pi pi-home'
      }
    ]
  }

}
