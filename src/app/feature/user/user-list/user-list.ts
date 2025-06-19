import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user-service';
import { AuthService } from '../../../service/auth-service';

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

  constructor(private userSvc: UserService, private authSvc : AuthService){}

  ngOnInit(): void {
    this.loggedInUser = this.authSvc.getUser().username;
    
    this.subscription = this.userSvc.getAll().subscribe({
      next : (resp) => {
        this.users = resp;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  delete(id : number) {
    
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  

}
