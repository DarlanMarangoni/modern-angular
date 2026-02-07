import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    RouterOutlet,
  ]
})
export class App implements OnInit {

  ngOnInit(): void {}

}
