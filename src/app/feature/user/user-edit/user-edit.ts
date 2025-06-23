import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';
import { Base } from '../../base/base';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css'
})
export class UserEdit extends Base implements OnInit {

  title: string = 'User Edit';

  override user : User = new User();

  userId! : number;

  constructor(
  private userSvc : UserService, 
  private router: Router, 
  private activateRoute: ActivatedRoute, 
  _authSvc : AuthService){
  
  super(_authSvc);
  
  }

  override ngOnInit(): void {

    super.ngOnInit();

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
}
