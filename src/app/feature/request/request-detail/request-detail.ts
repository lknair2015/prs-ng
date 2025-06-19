import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-request-detail',
  standalone: false,
  templateUrl: './request-detail.html',
  styleUrl: './request-detail.css'
})
export class RequestDetail implements OnInit, OnDestroy{

  title: String = "Request Detail";

  loggedInUser: string = "temp";

  request! : Request;

  requestId ! : number;

  subscription! : Subscription;
  

  constructor( private requestSvc: RequestService, private router : Router, private actRoute : ActivatedRoute, private authSvc : AuthService ){}

  ngOnInit(): void {

    this.loggedInUser = this.authSvc.getUser().username;

    this.actRoute.params.subscribe((parms) => {
        this.requestId = parms['id'];
        this.subscription = this.requestSvc.getById(this.requestId).subscribe({
          next: (resp) => {
            this.request = resp;
          },
          error: (err) => {
            console.log(err);
          }
        });
      });
  }

  delete() {
    this.requestSvc.delete(this.requestId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
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



