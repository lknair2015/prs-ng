import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../../../service/vendor-service';
import { Vendor } from '../../../model/vendor';
import { AuthService } from '../../../service/auth-service';
import { Base } from '../../base/base';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css'
})
export class ProductEdit extends Base implements OnInit, OnDestroy{

  title: string = "Product Edit";

  product! : Product;

  productId!: number;

  vendors: Vendor[] = [];

  constructor(
    private productSvc: ProductService, 
    private router: Router,
    private activateRoute: ActivatedRoute,
    private vendorSvc: VendorService,
    authSvc: AuthService
  ){
    super(authSvc);
  }

  override ngOnInit(): void {  

    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
    });
    
    this.activateRoute.params.subscribe((parms)=>{
      this.productId = parms['id'];
      this.subscription = this.productSvc.getById(this.productId).subscribe({
        next: (resp) =>{
          this.product = resp;
        },
        error: (err) => {
          console.log(err);
        }
      });
    });

    this.subscription = this.vendorSvc.getAll().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  save(): void{

    this.subscription = this.productSvc.update(this.productId, this.product).subscribe({
      next: () => {
        this.router.navigateByUrl('/product-list');
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id == b.id;
  }


}
