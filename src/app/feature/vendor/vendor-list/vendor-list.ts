import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { Subscription } from 'rxjs';
import { VendorService } from '../../../service/vendor-service';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-vendor-list',
  standalone: false,
  templateUrl: './vendor-list.html',
  styleUrl: './vendor-list.css'
})
export class VendorList implements OnInit, OnDestroy{

  title: string = 'Vendor List';

  loggedInUser : string = "temp"; 

  vendors : Vendor[] = [];

  subscription!: Subscription;

  constructor(private vendorSvc: VendorService, private authSvc : AuthService){}

  ngOnInit(): void {

    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
    });

    this.subscription = this.vendorSvc.getAll().subscribe({
      next : (resp) => {
        this.vendors = resp;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }
    
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  

}

