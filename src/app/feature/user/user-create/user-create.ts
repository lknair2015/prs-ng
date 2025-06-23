import { Component } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user-service';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';
import { Base } from '../../base/base';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.html',
  styleUrl: './user-create.css'
})
export class UserCreate extends Base {

  title: string = "User Create";

  newUser : User = new User();

  constructor(private userSvc: UserService, private router: Router, authSvc: AuthService){
    super(authSvc);
  }


  add(): void {
    this.subscription = this.userSvc.add(this.newUser).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

 

  
}
