import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product-service';
import { Router } from '@angular/router';
import { VendorService } from '../../../service/vendor-service';
import { Vendor } from '../../../model/vendor';
import { AuthService } from '../../../service/auth-service';
import { Base } from '../../base/base';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.html',
  styleUrl: './product-create.css'
})
export class ProductCreate extends Base  implements OnInit, OnDestroy{

  title: string = "Product Create";

  product : Product = new Product();

  vendors: Vendor[] = [];

  constructor(
    private productSvc: ProductService,
    private router: Router, 
    private vendorSvc : VendorService,
    authSvc : AuthService
  ){

    super(authSvc);
  }

  override ngOnInit(): void {

    super.ngOnInit();

    this.subscription = this.vendorSvc.getAll().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        console.log(err);
      }
    })
    
  }

  add(): void {
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
}
