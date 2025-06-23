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
import { Base } from '../../base/base';

@Component({
  selector: 'app-line-item-create',
  standalone: false,
  templateUrl: './line-item-create.html',
  styleUrl: './line-item-create.css'
})
export class LineItemCreate extends Base implements OnInit, OnDestroy{

  title : string = "Line Item create";

  requestId! : number ;

  request ! : Request;

  lineItem : LineItem = new LineItem();

  products: Product[] = [];
  
  constructor(
    private lineItemSvc : LineItemService, 
    private router: Router,
    private activateRoute: ActivatedRoute,
    authSvc : AuthService,
    private productSvc : ProductService,
    private requestSvc : RequestService
  ){
    super(authSvc);
  }

  override ngOnInit(): void {

    super.ngOnInit();

    this.activateRoute.params.subscribe((parms)=> {

      this.requestId = parms['id'];

      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) =>{
          this.request = resp;
        },
        error: (err) =>{
          console.log("LineItem create, get request by id" , err);
        }
      });

      this.subscription = this.productSvc.getAll().subscribe({
        next: (resp) => {
          this.products = resp;
        },
        error : (err) => {
          console.log("Line item create, get all products", err);
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
        console.log("Line item create, add new lineitem", err);
      }
    });
  }

}

