import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit, OnDestroy{

  title: String = "User Detail";

  loggedInUser: string = "temp";

  user! : User;

  userId ! : number;

  subscription! : Subscription;
  

  constructor( private userSvc: UserService, private router : Router, private actRoute : ActivatedRoute ){}

  ngOnInit(): void {

    this.actRoute.params.subscribe((parms) => {
        this.userId = parms['id'];
        this.subscription = this.userSvc.getById(this.userId).subscribe({
          next: (resp) => {
            this.user = resp;
          },
          error: (err) => {
            console.log(err);
          }
        });
      });
  }

  delete() {
    this.userSvc.delete(this.userId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

