import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { Subscription } from 'rxjs';
import { LineItemService } from '../../../service/line-item-service';
import { RequestService } from '../../../service/request-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';
import { Request } from '../../../model/request';
import { RequestReject } from '../../../model/request-reject';

@Component({
  selector: 'app-line-item-review',
  standalone: false,
  templateUrl: './line-item-review.html',
  styleUrl: './line-item-review.css'
})
export class LineItemReview implements OnInit, OnDestroy{

  title: string = "Purchase Request Approve/Reject";

  subTitle : string = "Line Items"

  lineItems : LineItem[] = [];
  
  loggedInUser : string = "";

  request! : Request;

  requestId !: number ; 

  subscription ! : Subscription;

  requestReject  : RequestReject = new RequestReject(); 
  
  constructor(
    private lineItemSvc : LineItemService, 
    private requestSvc : RequestService,
    private activateRoute : ActivatedRoute,
    private authSvc : AuthService,
    private router: Router
  ){}
 

  ngOnInit(): void {

    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
    });

    this.activateRoute.params.subscribe((parms)=> {
      this.requestId = parms['id'];
    });

    this.subscription = this.requestSvc.getById(this.requestId).subscribe({
      next: (resp) => {
        this.request = resp;
      },
      error: (err)=> {
        console.log(err);
      }
    })
    
    this.subscription = this.lineItemSvc.getByReqId(this.requestId).subscribe({
      next: (resp) => {
        this.lineItems = resp;
      },
      error: (err) => {
        console.log(err);
      }
    });
    
  }

  approve() : void {
    this.subscription = this.requestSvc.approve(this.requestId, this.request).subscribe({
      next: () => {
        this.router.navigateByUrl('/request-review');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  reject(): void {
    this.subscription = this.requestSvc.reject(this.requestId, this.requestReject).subscribe({
      next: () => {
        this.router.navigateByUrl('/request-review');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  } 

}
