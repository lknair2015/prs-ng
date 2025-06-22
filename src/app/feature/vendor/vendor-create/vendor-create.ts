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

  loggedInUser = "";

  vendor : Vendor = new Vendor();

  subscription ! : Subscription;

  states: string[] = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  constructor(
    private vendorSvc: VendorService, 
    private router: Router, 
    private authSvc : AuthService
  ){}

  ngOnInit(): void {
    
    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
    });
    
  }

  add(): void {

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

