import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from '../../../model/menu-item';
import { AuthService } from '../../../service/auth-service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from '../../../model/user';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu  implements OnInit, OnDestroy{
 
  activeComponent: any;

  user! : User ;

  subscription!: Subscription;

  menuItemsAdmin : MenuItem[] = [ new MenuItem('User', '/user-list', 'User List'),
                             new MenuItem('Vendor', '/vendor-list', 'Vendor List'),
                             new MenuItem('Product', '/product-list', 'Product List'),
                             new MenuItem('Request', '/request-list', 'Request List'),
                             new MenuItem('Review', '/request-review', 'Request Review'),
                             new MenuItem('Logout', '/logout', 'Logout')
      ];

  menuItemsNoAdmin : MenuItem[] = [ new MenuItem('User', '/user-list', 'User List'),
                             new MenuItem('Vendor', '/vendor-list', 'Vendor List'),
                             new MenuItem('Product', '/product-list', 'Product List'),
                             new MenuItem('Request', '/request-list', 'Request List'),
                             new MenuItem('Logout', '/logout', 'Logout')
      ];


  constructor(private authSvc : AuthService, public router : Router, private activatedRoute: ActivatedRoute){}
  
  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();

  }

  getChild(route: ActivatedRoute): any {
    if (route.firstChild) {
      return this.getChild(route.firstChild);
    } else {
      return route.routeConfig;
    }
  }
    
  

  ngOnInit(): void {

    this.authSvc.user$.subscribe(user => {
       this.user = user;
    });

    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.getChild(this.activatedRoute);
        this.activeComponent = child.path;
        console.log('Active Component:', this.activeComponent);
      });
   
  }
  

}
