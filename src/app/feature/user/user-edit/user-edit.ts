import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css'
})
export class UserEdit implements OnInit, OnDestroy {

  title: string = 'User Edit';

  loggedInUser : string = 'temp';

  user! : User;

  userId! : number;

  subscription! : Subscription;

  constructor(private userSvc : UserService, private router: Router, private activateRoute: ActivatedRoute, private authSvc : AuthService){}

  ngOnInit(): void {

    this.loggedInUser = this.authSvc.getUser().username;

    this.activateRoute.params.subscribe((parms) => {
      this.userId = parms['id'];

      this.subscription = this.userSvc.getById(this.userId).subscribe({
        next: (resp) => {
          this.user = resp;
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  save(): void {
    this.subscription = this.userSvc.update(this.userId, this.user).subscribe({
      next: () => {
        this.router.navigateByUrl('/user-list');
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
