import { Component, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';
import { Base } from '../../base/base';

@Component({
  selector: 'app-request-detail',
  standalone: false,
  templateUrl: './request-detail.html',
  styleUrl: './request-detail.css'
})
export class RequestDetail extends Base implements OnInit{

  title: String = "Request Detail";

  request! : Request;

  requestId ! : number;
  
  constructor( private requestSvc: RequestService, 
    private router : Router, 
    private actRoute : ActivatedRoute, 
    _authSvc : AuthService )
    {
    super(_authSvc);
  }

  override ngOnInit(): void {

    this.subscription = this.authSvc.user$.subscribe((user) => {
      this.loggedInUser = user.username;
    });

    this.actRoute.params.subscribe((parms) => {
        this.requestId = parms['id'];
        this.subscription = this.requestSvc.getById(this.requestId).subscribe({
          next: (resp) => {
            this.request = resp;
            console.log(this.request);
          },
          error: (err) => {
            console.log(err);
          }
        });
      });
  }

  delete() {
    this.requestSvc.delete(this.requestId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}



