import {Component} from '@angular/core';
import {demos} from './app.router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  demos = demos;

}
