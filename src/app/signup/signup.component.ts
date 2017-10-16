import { Component,OnInit } from "@angular/core";
import {signupService} from "./signup.service";
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import{Router} from "@angular/router";
import * as myGlobals from "../globals";
@Component({

    templateUrl:"signup.component.html",
    styleUrls:["signup.component.css"],
    selector :"app-root",
    providers :[signupService]
})
export class SignupComponent implements OnInit{
    formGroupSignup : FormGroup;
constructor(public formBuilderSignup : FormBuilder){}
 ngOnInit(){
    this.formGroupSignup = this.formBuilderSignup.group({
        name : ['',[Validators.required,Validators.minLength(6)]]
    })
}

}
