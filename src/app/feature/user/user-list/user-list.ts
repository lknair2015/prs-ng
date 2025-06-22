import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user-service';
import { AuthService } from '../../../service/auth-service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit, OnDestroy{

  title: string = 'User List';

  loggedInUser : string = "temp"; 

  users : User[] = [];

  subscription!: Subscription;

  constructor(private userSvc: UserService, private authSvc : AuthService, private router : Router){}

  ngOnInit(): void {
    
    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
    });
    
    this.subscription = this.userSvc.getAll().subscribe({
      next : (resp) => {
        this.users = resp;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  

}
