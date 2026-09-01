import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {Navbar} from './layout/navbar/navbar';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [
    RouterOutlet,
    Navbar,
    Toast
  ]
})
export class App implements OnInit {

  ngOnInit(): void {}

}
