import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserLogin } from '../model/user-login';


const URL = "http://localhost:8080/api/Users";  

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<User[]>{
    return this.http.get(URL+'/') as Observable<User[]>
  }

  getById(id : number) : Observable<User>{
    return this.http.get(URL+'/'+id) as Observable<User>;
  }

  add(user : User): Observable<User> {
    return  this.http.post(URL,user) as Observable<User>;
  }

  update(id : number, user : User) : Observable<User> {
    return this.http.put(URL+'/'+id, user) as Observable<User>
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(URL+'/'+id) as Observable<any>
  }

  login(loginUser: UserLogin): Observable<User>{
    return this.http.post(URL+'/login', loginUser) as Observable<User>;
  }
}
