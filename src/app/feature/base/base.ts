import { Directive, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Subscription } from 'rxjs';
import { User } from '../../model/user';


@Directive()

export abstract class Base implements OnInit, OnDestroy {

  subscription! : Subscription;
  user : User = new User(); 
  loggedInUser : string = " ";

  constructor(protected authSvc : AuthService){}

  ngOnInit(): void {
    
    this.subscription = this.authSvc.user$.subscribe((user) => {

      this.user = user;
      this.loggedInUser = user.username;

    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
