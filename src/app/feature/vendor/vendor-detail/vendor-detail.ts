import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-detail',
  standalone: false,
  templateUrl: './vendor-detail.html',
  styleUrl: './vendor-detail.css'
})
export class VendorDetail implements OnInit, OnDestroy{

  title: String = "Vendor Detail";

  loggedInUser: string = "temp";

  vendor! : Vendor;

  vendorId ! : number;

  subscription! : Subscription;
  

  constructor( private vendorSvc: VendorService, private router : Router, private actRoute : ActivatedRoute ){}

  ngOnInit(): void {

    this.actRoute.params.subscribe((parms) => {
        this.vendorId = parms['id'];
        this.subscription = this.vendorSvc.getById(this.vendorId).subscribe({
          next: (resp) => {
            this.vendor = resp;
          },
          error: (err) => {
            console.log(err);
          }
        });
      });
  }

  delete() {
    this.vendorSvc.delete(this.vendorId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/vendor-list');
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


