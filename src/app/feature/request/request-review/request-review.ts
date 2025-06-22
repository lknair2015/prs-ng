import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request-service';
import { AuthService } from '../../../service/auth-service';
import { Request } from '../../../model/request';

@Component({
  selector: 'app-request-review',
  standalone: false,
  templateUrl: './request-review.html',
  styleUrl: './request-review.css'
})
export class RequestReview implements OnInit, OnDestroy{

  title: string = 'Request List';

  loggedInUser : string = "temp"; 

  userId! : number ;

  requests : Request[] = [];

  subscription!: Subscription;

  constructor(private requestSvc: RequestService, private authSvc : AuthService ){}

  ngOnInit(): void {

    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
      this.userId = user.id;
    });

    this.subscription = this.requestSvc.requestsForReview(this.userId).subscribe({
      next : (resp) => {
        this.requests = resp;
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
