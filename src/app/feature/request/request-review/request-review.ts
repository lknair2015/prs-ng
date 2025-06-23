import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request-service';
import { AuthService } from '../../../service/auth-service';
import { Request } from '../../../model/request';
import { Base } from '../../base/base';

@Component({
  selector: 'app-request-review',
  standalone: false,
  templateUrl: './request-review.html',
  styleUrl: './request-review.css'
})
export class RequestReview extends Base implements OnInit{

  title: string = 'Request List';

  userId! : number ;

  requests : Request[] = [];

  constructor(private requestSvc: RequestService, authSvc : AuthService ){
    super(authSvc);
  }

  override ngOnInit(): void {

  super.ngOnInit();

    this.subscription = this.requestSvc.requestsForReview(this.userId).subscribe({
      next : (resp) => {
        this.requests = resp;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

}
