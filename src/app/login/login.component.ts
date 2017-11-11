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
    constructor(public formBuilder : FormBuilder, 
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: LoginService,
        private alertService: AlertService) { }
       ngOnInit() { 
        this.formGroupLogin = this.formBuilder.group({
            mail :['',Validators.required],
            password :['',Validators.required]
        })
        this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(e => {
          if(myGlobals.signupSuccess == true ){
            this.alertService.success('Inscription réussite', true);   
          }
          
        });
    }
    login(infLogin : any) {
        
        this.loading = true;
        this.authenticationService.login(infLogin.mail,infLogin.password)
            .subscribe(
                data => {
                    myGlobals.setLogged(true);
                    jQuery("#loginModal").modal("hide");
                    this.router.navigate(['/users/'+JSON.parse(localStorage.getItem("currentUser"))["id"]+'/profile']);
                   
                },
                error => {
                    this.alertService.error(error.json().errors[0]["message"]);
                    this.loading = false;
                });
    }
    

}