import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request-service';
import { AuthService } from '../../../service/auth-service';
import { Request } from '../../../model/request';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.html',
  styleUrl: './request-list.css'
})
export class RequestList implements OnInit, OnDestroy{

  title: string = 'Request List';

  loggedInUser : string = "temp"; 

  requests : Request[] = [];

  subscription!: Subscription;

  constructor(private requestSvc: RequestService, private authSvc : AuthService ){}

  ngOnInit(): void {

    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
    });

    this.subscription = this.requestSvc.getAll().subscribe({
      next : (resp) => {
        this.requests = resp;
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
