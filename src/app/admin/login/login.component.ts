import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute ,NavigationEnd} from '@angular/router';
import { AlertService} from '../../alert/index';
import {  LoginAdminService} from "./loginService";
import { FormBuilder,FormControl,FormGroup,Validators } from "@angular/forms";
import * as myGlobals from "../../globals";
declare var jQuery : any;
@Component({
    selector: 'login-admin',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],    
})
export class LoginAdminComponent implements OnInit {
    loading = false;
    public formGroupLogin: FormGroup;
    constructor(public formBuilder : FormBuilder, 
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: LoginAdminService,
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
        console.log("entré")
        this.loading = true;
        this.authenticationService.login(infLogin.mail,infLogin.password)
            .subscribe(
                data => {
                    myGlobals.setLogged(true);
                    this.router.navigate(['/admin/'+JSON.parse(localStorage.getItem("currentUser"))["id"]+'/home']);
                },
                error => {
                    this.alertService.error(error.json().error["message"]);
                    this.loading = false;
                });
    }

}