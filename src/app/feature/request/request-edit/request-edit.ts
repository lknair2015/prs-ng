import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { RequestService } from '../../../service/request-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user-service';
import { AuthService } from '../../../service/auth-service';
import { Request } from '../../../model/request';
import { Base } from '../../base/base';

@Component({
  selector: 'app-request-edit',
  standalone: false,
  templateUrl: './request-edit.html',
  styleUrl: './request-edit.css'
})
export class RequestEdit extends Base implements OnInit{

  title: string = "Request Edit";

  request! : Request;

  requestId!: number;

  users: User[] = [];

  mode : string[] = ["Pickup", "Delivery"];

  constructor(
    private requestSvc: RequestService, 
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userSvc: UserService,
    authSvc : AuthService
  ){
    super(authSvc);
  }

  override ngOnInit(): void {

    super.ngOnInit();

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

}

