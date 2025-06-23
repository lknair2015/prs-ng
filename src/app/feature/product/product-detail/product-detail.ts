import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';
import { Base } from '../../base/base';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail extends Base implements OnInit, OnDestroy{

  title: String = "Product Detail";

  product! : Product;

  productId ! : number;
  
  constructor( 
    private productSvc: ProductService, 
    private router : Router, 
    private actRoute : ActivatedRoute,
    _authSvc : AuthService
  ){
    super(_authSvc);
  }

  override ngOnInit(): void {

    super.ngOnInit();

    this.actRoute.params.subscribe((parms) => {
        this.productId = parms['id'];
        this.subscription = this.productSvc.getById(this.productId).subscribe({
          next: (resp) => {
            this.product = resp;
          },
          error: (err) => {
            console.log(err);
          }
        });
      });
  }

  delete() {
    this.productSvc.delete(this.productId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/product-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

 

}


