import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as myGlobals from "../../globals"
import 'rxjs/add/operator/map'
@Injectable()
export class LoginAdminService {
    constructor(private http: Http) { }

    login(mail: any, password: any) {
        return this.http.post(myGlobals.url+'user/login', JSON.stringify({ mail:mail, password: password }))
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
  
  isLogged() {
  }
}