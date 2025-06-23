import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request-service';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';
import { RequestNew } from '../../../model/request-new';
import { Base } from '../../base/base';

@Component({
  selector: 'app-request-create',
  standalone: false,
  templateUrl: './request-create.html',
  styleUrl: './request-create.css'
})
export class RequestCreate extends Base implements OnInit, OnDestroy{

  title: string = "Request Create";

  requestNew : RequestNew  = new RequestNew();

  userFullName : string = "";

  request : Request = new Request();

  mode : string[] = ["Pickup", "Delivery"];

  constructor(
    private requestSvc: RequestService, 
    private router: Router, 
    _authSvc: AuthService
  ){
    super(_authSvc);
  }

  override ngOnInit(): void {

    super.ngOnInit();

    this.requestNew.userId = this.user.id;

    this.userFullName = this.user.firstName + " " + this.user.lastName;
    
  }

  add(): void {
    console.log(this.requestNew);
    this.subscription = this.requestSvc.add(this.requestNew).subscribe({
      next: (resp) => {
        this.request = resp;
        console.log(this.request);
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}

