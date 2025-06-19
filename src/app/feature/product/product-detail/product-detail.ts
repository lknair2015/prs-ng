import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit, OnDestroy{

  title: String = "Product Detail";

  loggedInUser: string = "";

  product! : Product;

  productId ! : number;

  subscription! : Subscription;
  

  constructor( 
    private productSvc: ProductService, 
    private router : Router, 
    private actRoute : ActivatedRoute,
    private authSvc : AuthService
  ){}

  ngOnInit(): void {

    this.loggedInUser = this.authSvc.getUser().username;

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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}


