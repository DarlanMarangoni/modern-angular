import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.scss',
  imports: [FormsModule],
})
export class User {

  username = 'Darlan';
  favoriteFramework = '';

  showFramework() {
    alert(this.favoriteFramework);
  }

}
