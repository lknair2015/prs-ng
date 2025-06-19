import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { LineItemService } from '../../../service/line-item-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';
import { ProductService } from '../../../service/product-service';
import { RequestService } from '../../../service/request-service';
import { Request } from '../../../model/request';

@Component({
  selector: 'app-line-item-create',
  standalone: false,
  templateUrl: './line-item-create.html',
  styleUrl: './line-item-create.css'
})
export class LineItemCreate implements OnInit, OnDestroy{

  title : string = "Line Item create";

  loggedInUser: string = "";

  requestId! : number ;

  request ! : Request;

  lineItem : LineItem = new LineItem();

  subscription! : Subscription;

  products: Product[] = [];
  
  constructor(
    private lineItemSvc : LineItemService, 
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authSvc : AuthService,
    private productSvc : ProductService,
    private requestSvc : RequestService
  ){}

  ngOnInit(): void {

    this.loggedInUser = this.authSvc.getUser().username;

    this.activateRoute.params.subscribe((parms)=> {

      this.requestId = parms['id'];

      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) =>{
          this.request = resp;
        },
        error: (err) =>{
          console.log(err);
        }
      });

      this.subscription = this.productSvc.getAll().subscribe({
        next: (resp) => {
          this.products = resp;
        },
        error : (err) => {
          console.log(err);
        }
      });
      
    });

  }

  add() : void {

    this.lineItem.request = this.request;
    
    this.subscription = this.lineItemSvc.add(this.lineItem).subscribe({
      next: () => {
        this.router.navigateByUrl('/line-item-list/'+ this.requestId);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

