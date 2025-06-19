import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { VendorService } from '../../../service/vendor-service';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-vendor-create',
  standalone: false,
  templateUrl: './vendor-create.html',
  styleUrl: './vendor-create.css'
})
export class VendorCreate implements OnInit, OnDestroy{

  title: string = "Vendor Create";

  loggedInUser = "temp";

  vendor : Vendor = new Vendor();

  subscription ! : Subscription;

  constructor(private vendorSvc: VendorService, private router: Router, private authSvc : AuthService){}

  ngOnInit(): void {
    
    this.loggedInUser= this.authSvc.getUser().username;
    
  }

  addVendor(): void {

    this.subscription = this.vendorSvc.add(this.vendor).subscribe({
      next: (resp) => {
        this.vendor = resp;
        this.router.navigateByUrl('/vendor-list');
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

