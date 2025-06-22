import { Component } from '@angular/core';
import { AuthService } from './service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected title = 'prs-ng';

  showNav : boolean = true;

}
