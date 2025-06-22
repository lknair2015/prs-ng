import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { Subscription } from 'rxjs';
import { VendorService } from '../../../service/vendor-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-vendor-edit',
  standalone: false,
  templateUrl: './vendor-edit.html',
  styleUrl: './vendor-edit.css'
})
export class VendorEdit implements OnInit, OnDestroy {

  title: string = 'Vendor Edit';

  loggedInUser : string = '';

  vendor! : Vendor;

  vendorId! : number;

  subscription! : Subscription;

  constructor(
    private vendorSvc : VendorService, 
    private router: Router, 
    private activateRoute: ActivatedRoute,
    private authSvc : AuthService
  ){}

  ngOnInit(): void {

    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
    });

    this.activateRoute.params.subscribe((parms) => {
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

  save(): void {
    this.subscription = this.vendorSvc.update(this.vendorId, this.vendor).subscribe({
      next: () => {
        this.router.navigateByUrl('/vendor-list');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  

}

