import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product-service';
import { Product } from '../../../model/product';
import { Base } from '../../base/base';

@Component({
  selector: 'app-line-item-edit',
  standalone: false,
  templateUrl: './line-item-edit.html',
  styleUrl: './line-item-edit.css'
})
export class LineItemEdit extends Base implements OnInit, OnDestroy{

  title : string = "Line Item edit";

  lineItemId! : number ;

  requestId! : number;

  lineItem! : LineItem;

  products: Product[] = [];
  
  constructor(
    public lineItemSvc : LineItemService, 
    public router: Router,
    public activateRoute: ActivatedRoute,
    authSvc : AuthService,
    public productSvc : ProductService
  ){
    super(authSvc);
  }

  override ngOnInit(): void {

    super.ngOnInit();

    this.activateRoute.params.subscribe((parms)=> {

      this.requestId = parms['id'];
      this.lineItemId = parms['anotherId'];

      this.subscription = this.lineItemSvc.getById(this.lineItemId).subscribe({

        next: (resp) => {
          this.lineItem = resp;
        },
        error: (err) => {
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

  save() : void {
    this.subscription = this.lineItemSvc.update(this.lineItemId, this.lineItem).subscribe({
      next: () => {
        this.router.navigateByUrl('/line-item-list/'+ this.lineItem.request.id);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  compProduct(a: Product, b: Product): boolean {
      return a && b && a.id == b.id;
  }


}
