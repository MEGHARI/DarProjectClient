import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as myglobals from "../globals"
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import * as myGlobals from "../globals"
declare var $ : any;
@Injectable()
export class LoginService {
    constructor(private http: Http) { }


    /**
     * 
     * When user login , we send in the header informations of FingerPrint. 
     */
    login(mail: any, password: any) {

        return this.http.post(myglobals.url+'user/login',JSON.stringify({ mail:mail, password: password}),this.fingerPrint())
            .map((response: Response) => {
                let user = response.json();
                console.log(user);
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


    /**
     * this function send to server informations FingerPrint of incoming user.
     */
    private fingerPrint() {
        //the properties added in order to use fingerPrint
        
        // Timezone offset of client (example -60).
        var timezone = new Date().getTimezoneOffset()
        // Resolution of screen used by client (height,width,colorDepth)
        var resolution = "width :"+window.screen.width+" height:"
            +window.screen.height+" colorDepth:"+window.screen.colorDepth;  
        // To check if cookie is enabled or not. 
        var cookieEnabled = window.navigator.cookieEnabled? 1 : 0;

        let headers = new Headers({'timezone':timezone,
        'resolution':resolution,'enabledCookie':cookieEnabled});

        return new RequestOptions({ headers: headers });
    }


  
}