import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as myglobals from "../globals"
import 'rxjs/add/operator/map'
@Injectable()
export class LoginService {
    constructor(private http: Http) { }

    login(mail: any, password: any) {
        return this.http.post(myglobals.url+'user/login', JSON.stringify({ mail:mail, password: password }))
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));

                }
            });
    }
  
    logout() {
      localStorage.removeItem('currentUser');
    }


  
}