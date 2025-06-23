import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';
import { Base } from '../../base/base';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail extends Base implements OnInit{

  title: String = "User Detail";

  override user : User = new User();

  userId ! : number;
  

  constructor( 
    private userSvc: UserService, 
    private router : Router, 
    private actRoute : ActivatedRoute,
    _authSvc : AuthService
   ){
    super(_authSvc);
   }

  override ngOnInit(): void {

    super.ngOnInit();

    this.actRoute.params.subscribe((parms) => {
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

  delete() {
    this.userSvc.delete(this.userId).subscribe({
      next: (_resp) => {
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}

