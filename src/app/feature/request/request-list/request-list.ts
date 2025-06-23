import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request-service';
import { AuthService } from '../../../service/auth-service';
import { Request } from '../../../model/request';
import { Base } from '../../base/base';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.html',
  styleUrl: './request-list.css'
})
export class RequestList extends Base implements OnInit{

  title: string = 'Request List';

  requests : Request[] = [];

  constructor(private requestSvc: RequestService, authSvc : AuthService ){
    super(authSvc);
  }

  override ngOnInit(): void {

    super.ngOnInit();

    if(this.user.admin ){

      this.subscription = this.requestSvc.getAll().subscribe({
        next : (resp) => {
          this.requests = resp;
        },
        error : (err) => {
         console.log(err);
       }
      });
    }
    else{
      this.subscription = this.requestSvc.getByUserId(this.user.id).subscribe({
        next : (resp) => {
          this.requests = resp;
        },
        error : (err) => {
         console.log(err);
       }
      });
    }
  }

}
