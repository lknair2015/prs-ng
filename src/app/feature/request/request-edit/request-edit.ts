import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { RequestService } from '../../../service/request-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user-service';
import { AuthService } from '../../../service/auth-service';
import { Request } from '../../../model/request';

@Component({
  selector: 'app-request-edit',
  standalone: false,
  templateUrl: './request-edit.html',
  styleUrl: './request-edit.css'
})
export class RequestEdit implements OnInit, OnDestroy{

  title: string = "Request Edit";

  loggedInUser : string = "temp";

  request! : Request;

  requestId!: number;

  subscription!: Subscription;

  users: User[] = [];

  mode : string[] = ["Pickup", "Delivery"];

  constructor(
    private requestSvc: RequestService, 
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userSvc: UserService,
    private authSvc : AuthService
  ){}

  ngOnInit(): void {

    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
    });

    this.activateRoute.params.subscribe((parms)=>{
      this.requestId = parms['id'];
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) =>{
          this.request = resp;
        },
        error: (err) => {
          console.log(err);
        }
      });
    });

    this.subscription = this.userSvc.getAll().subscribe({
      next: (resp) => {
        this.users = resp;
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  save(): void{

    this.subscription = this.requestSvc.update(this.requestId, this.request).subscribe({
      next: () => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  compVendor(a: User, b: User): boolean {
    return a && b && a.id == b.id;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  } 

}

