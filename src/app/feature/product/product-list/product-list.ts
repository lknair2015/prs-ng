import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product-service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit, OnDestroy{

  title: string = 'Product List';

  loggedInUser : string = "temp"; 

  products : Product[] = [];

  subscription!: Subscription;

  constructor(private ProductSvc: ProductService, private authSvc: AuthService){}

  ngOnInit(): void {

    this.loggedInUser = this.authSvc.getUser().username;
    
    this.subscription = this.ProductSvc.getAll().subscribe({
      next : (resp) => {
        this.products = resp;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  delete(id : number) {
    
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
