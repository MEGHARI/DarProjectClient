/// <reference path="../toaster.d.ts" />
import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute ,NavigationEnd} from '@angular/router';
import { AlertService} from '../alert/index';
import {  LoginService} from "./loginService.component";
import { FormBuilder,FormControl,FormGroup,Validators } from "@angular/forms";
import * as myGlobals from "../globals";
import {AppComponent} from "../app.component"
import { User } from "../models/user";
declare var $ : any;
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],    
})
export class LoginComponent implements OnInit {
    toastCounter =0;
    loading = false;
    user : User;
    loadingPass = false;
    public formGroupLogin: FormGroup;
    public formGroupPass : FormGroup;
    public isConfirm : boolean = false;
    constructor(public formBuilder : FormBuilder,public formBuilderPass : FormBuilder,
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
        this.formGroupPass = this.formBuilderPass.group({
            mailPass : ['',Validators.required]
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
                        $("#loginModal").modal("hide");
                        this.router.navigate(['/users/'+JSON.parse(localStorage.getItem("currentUser"))["id"]+'/profile']);
                    },
                    error => {
                        console.log(error.json())
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
                        myGlobals.setLogged(true);
                        $("#loginModal").modal("hide");
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

    forgotPass(forgotPass : any){
        this.loadingPass = true;
        this.authenticationService.forgotPass(forgotPass.mailPass).subscribe(
            data =>{this.alertService.success(data["message"]) ;this.loadingPass = false;$("#forgot").modal().hide();},
            error =>{this.alertService.error(error.json().error["message"]);this.loadingPass = false;$("#forgot").modal().hide();}
        )
       
    }
    hiddenMoadal(){
        
        $( "#mdp" ).click(function( event ) {
            event.preventDefault();
          });
        
    }
     
  
    

}