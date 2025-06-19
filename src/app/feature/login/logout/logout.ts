import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout implements OnInit{

  constructor(
    private authSvc : AuthService,
    private router : Router
  ){}

  ngOnInit(): void {

    this.authSvc.logout();
    window.location.reload;
    this.router.navigateByUrl('/login');
    
  }

}
