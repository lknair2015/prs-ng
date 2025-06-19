import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product-service';
import { Router } from '@angular/router';
import { VendorService } from '../../../service/vendor-service';
import { Vendor } from '../../../model/vendor';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.html',
  styleUrl: './product-create.css'
})
export class ProductCreate  implements OnInit, OnDestroy{

  title: string = "Product Create";

  loggedInUser = "temp";

  product : Product = new Product();

  vendors: Vendor[] = [];

  subscription ! : Subscription;

  constructor(private productSvc: ProductService,private router: Router, private vendorSvc : VendorService){}

  ngOnInit(): void {
    this.subscription = this.vendorSvc.getAll().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        console.log(err);
      }
    })
    
  }

  addProduct(): void {
    this.subscription = this.productSvc.add(this.product).subscribe({
      next: (resp) => {
        this.product = resp;
        this.router.navigateByUrl('/product-list');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  
}
