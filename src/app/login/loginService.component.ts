import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as myglobals from "../globals"
import 'rxjs/add/operator/map'
import * as myGlobals from "../globals"
declare var $ : any;
@Injectable()
export class LoginService {
    constructor(private http: Http) { }

    login(mail: any, password: any) {
        return this.http.post(myglobals.url+'user/login', JSON.stringify({ mail:mail, password: password }))
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    //this.resetCurrentUser();
                    localStorage.setItem('currentUser', JSON.stringify(user));

                }
            });
    }
    confirmSubscription(mail: any,code:any, password: any) {
        return this.http.post(myglobals.url+'user/confirmCode', JSON.stringify({ mail:mail,code :code, password: password }))
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                   // this.resetCurrentUser();
                    localStorage.setItem('currentUser', JSON.stringify(user));

                }
            });
    }
  
    logout() {
      localStorage.removeItem('currentUser');
    }

    forgotPass(mail: any) {
        return this.http.post(myGlobals.url+'user/recoverPassword',JSON.stringify({mail : mail})).map((response: Response) => response.json());     
    }


    public resetCurrentUser(){
        if(localStorage.getItem("currentUser")!==null)
            localStorage.removeItem("currentUser");
    }
    hiddenMoadal(){
        $("")
    }


  
}