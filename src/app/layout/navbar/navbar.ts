import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { ThemeService } from '../../shared/service/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    Toolbar,
    Button,
    Drawer
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {

  protected readonly themeService = inject(ThemeService);

  protected drawerVisible = false;

}
