import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConectivityService extends HttpService {

  constructor(private readonly http: HttpClient) { super(http) }

  disconectUser(accessToken: string){
    return this.delete(`oauth/user?accessToken=${accessToken}`);
  }

  getCallBack(data: any): Observable<any>{
    return this.post(`oauth/callback`, data);
  }
}
