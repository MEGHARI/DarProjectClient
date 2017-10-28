import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()
export class LoginService {
    constructor(private http: Http) { }

    login(mail: any, password: any) {
        return this.http.post('/api/authenticate', JSON.stringify({ mail:mail, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
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