import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,NavigationEnd} from '@angular/router';
import { AlertService} from '../alert/index';
import {  LoginService} from "./loginService.component";
import { FormBuilder,FormControl,FormGroup,Validators } from "@angular/forms";
import * as myGlobals from "../globals";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],    
})
export class LoginComponent implements OnInit {
    loading = false;
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
        // reset login status
        this.authenticationService.logout();
    }
    login(infLogin : any) {
        this.loading = true;
        this.authenticationService.login(infLogin.mail,infLogin.password)
            .subscribe(
                data => {
                    this.router.navigate(['/profile']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}