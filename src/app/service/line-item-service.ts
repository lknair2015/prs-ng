import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LineItem } from '../model/line-item';

const URL = 'http://localhost:8080/api/LineItems'

@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<LineItem[]>{
    return this.http.get(URL+'/') as Observable<LineItem[]>
  }

  getById(id : number) : Observable<LineItem>{
    return this.http.get(URL+'/'+id) as Observable<LineItem>;
  }

  getByReqId(reqId : number) : Observable<LineItem[]>{
    return this.http.get(URL+'/lines-for-req/'+reqId) as Observable<LineItem[]>;
  }

  add(lineItem : LineItem): Observable<LineItem> {
    return  this.http.post(URL,lineItem) as Observable<LineItem>;
  }

  update(id : number, lineItem : LineItem) : Observable<LineItem> {
    return this.http.put(URL+'/'+id, lineItem) as Observable<LineItem>
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(URL+'/'+id) as Observable<any>
  }
}
