import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor-service';
import { AuthService } from '../../../service/auth-service';
import { Base } from '../../base/base';

@Component({
  selector: 'app-vendor-list',
  standalone: false,
  templateUrl: './vendor-list.html',
  styleUrl: './vendor-list.css'
})
export class VendorList extends Base implements OnInit{

  title: string = 'Vendor List';

  vendors : Vendor[] = [];

  constructor(private vendorSvc: VendorService, _authSvc : AuthService){
    super(_authSvc);
  }

  override ngOnInit(): void {

    super.ngOnInit();

    console.log("admin", this.user.admin)

    this.subscription = this.vendorSvc.getAll().subscribe({
      next : (resp) => {
        this.vendors = resp;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

}

