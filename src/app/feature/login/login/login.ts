import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/user-login';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user-service';
import { User } from '../../../model/user';
import { AuthService } from '../../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnDestroy, OnInit{

  title : string = "Login";

  loginUser : UserLogin = new UserLogin();

  user : User = new User();

  subscription! : Subscription;

  message : string = "";

  constructor(private userSvc : UserService, private authSvc: AuthService, private router : Router){}

  ngOnInit(): void {

  }

  login(): void {
    this.subscription = this.userSvc.login(this.loginUser).subscribe({
      next :(resp) => {
        this.user = resp;
        this.authSvc.setUser(this.user);
        window.location.href = '/user-list';
        
      },
      error: (err) => {
        console.log(err);
        this.message = "Incorrect username and password. Please try again!";
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
