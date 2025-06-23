import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user-service';
import { AuthService } from '../../../service/auth-service';
import { Router } from '@angular/router';
import { Base } from '../../base/base';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList extends Base implements OnInit{

  title: string = 'User List';
  users : User[] = [];

  constructor(private userSvc: UserService, authSvc : AuthService,  private router : Router){

    super(authSvc);
  }

  override ngOnInit(): void {

    super.ngOnInit();

    if(this.loggedInUser == null){
      this.router.navigateByUrl('/login');
    }
    
    this.subscription = this.userSvc.getAll().subscribe({
      next : (resp) => {
        this.users = resp;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

}
