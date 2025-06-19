import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../model/menu-item';
import { AuthService } from '../../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  loggedIn  : boolean = false; 

 

  menuItems : MenuItem[] = [ new MenuItem('User', '/user-list', 'User List'),
                             new MenuItem('Vendor', '/vendor-list', 'Vendor List'),
                             new MenuItem('Product', '/product-list', 'Product List'),
                             new MenuItem('Request', '/request-list', 'Request List'),
                             new MenuItem('Review', '/request-review', 'Request Review'),
                             new MenuItem('Logout', '/logout', 'Logout')
      ];

  constructor(private authSvc : AuthService, public router : Router){}
  

}
