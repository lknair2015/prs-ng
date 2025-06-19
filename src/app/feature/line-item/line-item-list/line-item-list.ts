import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { Request } from '../../../model/request';
import { LineItemService } from '../../../service/line-item-service';
import { RequestService } from '../../../service/request-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-line-item-list',
  standalone: false,
  templateUrl: './line-item-list.html',
  styleUrl: './line-item-list.css'
})
export class LineItemList implements OnInit, OnDestroy{

  title: string = "Purchase Request Line Items";

  subTitle : string = "Line Items"

  lineItems : LineItem[] = [];
  
  loggedInUser : string = "";

  request! : Request;

  requestId !: number ; 

  subscription ! : Subscription;
  
  constructor(
    private lineItemSvc : LineItemService, 
    private requestSvc : RequestService,
    private activateRoute : ActivatedRoute,
    private authSvc : AuthService,
    private router: Router
  ){}
 

  ngOnInit(): void {

    this.loggedInUser = this.authSvc.getUser().username;

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

  delete(id : number){

    this.subscription = this.lineItemSvc.delete(id).subscribe({
      next: () =>{
        window.location.reload();
      },
      error: (err) => {
        console.log(err); 
      }
    });

  }
  
  submit(){
    this.subscription = this.requestSvc.submitForReview(this.requestId, this.request).subscribe({
      next:() => {
        this.router.navigateByUrl('/request-list');
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
