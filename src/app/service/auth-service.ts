import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /* setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
  } */

  private userSubject = new BehaviorSubject<User>(this.getStoredUser());
  public user$ = this.userSubject.asObservable();

  getUser(): User {
    return this.userSubject.getValue();
  }

  getStoredUser() {
     return JSON.parse(localStorage.getItem('user') || '{}');
  }

  setUser(user: User): void {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    this.userSubject.next(new User());
    localStorage.removeItem('user');
  }
  
}
