import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user-service';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.html',
  styleUrl: './user-create.css'
})
export class UserCreate implements OnInit, OnDestroy{

  title: string = "User Create";

  loggedInUser = "temp";

  user : User = new User();

  subscription ! : Subscription;

  constructor(private userSvc: UserService, private router: Router, private authSvc: AuthService){}

  ngOnInit(): void {
    
    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
    });
  }

  add(): void {
    this.subscription = this.userSvc.add(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  
}
