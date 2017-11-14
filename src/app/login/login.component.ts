import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute ,NavigationEnd} from '@angular/router';
import { AlertService} from '../alert/index';
import {  LoginService} from "./loginService.component";
import { FormBuilder,FormControl,FormGroup,Validators } from "@angular/forms";
import * as myGlobals from "../globals";
import {AppComponent} from "../app.component"
import { User } from "../models/user";
declare var jQuery : any;
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],    
})
export class LoginComponent implements OnInit {
   
    loading = false;
    user : User;
    public formGroupLogin: FormGroup;
    public isConfirm : boolean = false;
    constructor(public formBuilder : FormBuilder, 
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: LoginService,
       
        private alertService: AlertService) { }
       ngOnInit() { 
        if(!(localStorage.getItem("currentUser")===null)){
            this.router.navigate(["/home"])
        }
        this.formGroupLogin = this.formBuilder.group({
            mail :['',Validators.required],
            password :['',Validators.required],
            codeConfirm :['']
        })
        this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(e => {
          if(myGlobals.signupSuccess == true ){
            this.alertService.success('Inscription réussite', true);   
            this.isConfirm=true;
            myGlobals.setSignupSuccess(false);  
          }
          
        });
    }
    login(infLogin : any) {
        if(!this.isConfirm){
            this.loading = true;
            this.authenticationService.login(infLogin.mail,infLogin.password)
                .subscribe(                    
                    data => {
                        myGlobals.setLogged(true);
                        jQuery("#loginModal").modal("hide");
                        this.router.navigate(['/users/'+JSON.parse(localStorage.getItem("currentUser"))["id"]+'/profile']);
                    },
                    error => {
                        console.log(error.json().error["message"])
                        if(error.json().error["message"]=="l'utilisateur doit confirmer l'inscription"){
                            this.isConfirm = true;
                        }
                        this.alertService.error(error.json().error["message"]);
                        this.loading = false;
                    });
        } else {
            console.log(infLogin.codeConfirm)
            this.loading = true;
            this.authenticationService.confirmSubscription(infLogin.mail,infLogin.codeConfirm ,infLogin.password)
                .subscribe(
                    data => {
                        console.log(data)
                        console.log("bingooooooo")
                        myGlobals.setLogged(true);
                        jQuery("#loginModal").modal("hide");
                        this.router.navigate(['/users/'+JSON.parse(localStorage.getItem("currentUser"))["id"]+'/profile']);
                    },
                    error => {
                        console.log("erreur"+error.json())
                        if(error.json().error["message"]=="l'utilisateur doit confirmer l'inscription"){
                            this.isConfirm = true;
                       }
                        this.alertService.error(error.json().error["message"]);
                        this.loading = false;
                    });

        }
        
    }
    public logOut(){
        localStorage.removeItem("currentUser");
    }
   
    

}