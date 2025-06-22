import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request-service';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user-service';
import { AuthService } from '../../../service/auth-service';
import { RequestNew } from '../../../model/request-new';

@Component({
  selector: 'app-request-create',
  standalone: false,
  templateUrl: './request-create.html',
  styleUrl: './request-create.css'
})
export class RequestCreate implements OnInit, OnDestroy{

  title: string = "Request Create";

  loggedInUser = "temp";

  requestNew : RequestNew  = new RequestNew();

  userFullName : string = "";

  request : Request = new Request();

  subscription ! : Subscription;

  mode : string[] = ["Pickup", "Delivery"];

  constructor(
    private requestSvc: RequestService, 
    private router: Router, 
    private userSvc : UserService , 
    private authSvc: AuthService
  ){}

  ngOnInit(): void {

    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
      this.userFullName = user.firstName + " " + user.lastName;
      this.requestNew.userId = user.id;
    });
    
  }

  add(): void {
    console.log(this.requestNew);
    this.subscription = this.requestSvc.add(this.requestNew).subscribe({
      next: (resp) => {
        this.request = resp;
        console.log(this.request);
        this.router.navigateByUrl('/request-list');
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

