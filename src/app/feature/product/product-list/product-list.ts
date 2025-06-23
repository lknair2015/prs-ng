import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product-service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../service/auth-service';
import { Base } from '../../base/base';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList extends Base implements OnInit, OnDestroy{

  title: string = 'Product List';

  products : Product[] = [];

  constructor(private ProductSvc: ProductService, authSvc: AuthService){
    super(authSvc);
  }

  override ngOnInit(): void {

    super.ngOnInit();
    
    this.subscription = this.ProductSvc.getAll().subscribe({
      next : (resp) => {
        this.products = resp;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

}
