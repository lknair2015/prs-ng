import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../model/request';
import { RequestNew } from '../model/request-new';
import { RequestReject } from '../model/request-reject';

const URL = 'http://localhost:8080/api/Requests'

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<Request[]>{
    return this.http.get(URL+'/') as Observable<Request[]>
  }

  getById(id : number) : Observable<Request>{
    return this.http.get(URL+'/'+id) as Observable<Request>;
  }

  add(requestNew : RequestNew): Observable<Request> {
    return  this.http.post(URL,requestNew) as Observable<Request>;
  }

  update(id : number, request : Request) : Observable<Request> {
    return this.http.put(URL+'/'+id, request) as Observable<Request>
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(URL+'/'+id) as Observable<any>
  }

  submitForReview(id : number, request: Request) : Observable<Request> {
    return this.http.put(URL+'/submit-review/'+id, request) as Observable<Request>;
  }

  requestsForReview(userId : number) : Observable<Request[]> {
    return this.http.get(URL+'/list-review/'+userId) as Observable<Request[]>;
  }

  approve(id : number, request : Request): Observable<Request>{
    return this.http.put(URL+'/approve/'+id, request ) as Observable<Request>;
  }

  reject(id : number, requestReject : RequestReject) : Observable<Request>{
    return this.http.put(URL+'/reject/'+id, requestReject) as Observable<Request>;
  }
}
