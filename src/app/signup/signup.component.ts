import { Component,OnInit } from "@angular/core";
import {signupService} from "./signup.service";
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import{Router} from "@angular/router";
import {PasswordValidation} from "./password.confirm"
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

        name : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
        firstName : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
        mail : ['',[Validators.required,Validators.pattern("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$")]],
        postalCode : ['',[Validators.required,Validators.pattern(" \^[0-9]{5,5}$\ ")]],
        dateOfBirth :['',[Validators.required,Validators.pattern("\^([0-3][0-9]})(/)([0-9]{2,2})(/)([0-3]{2,2})$\ ")]],
        image :['',Validators.required],
        password:['',Validators.required],
        addresse :['',Validators.required],
        confirmPassword : ['',Validators.required],

    },{
        validator: PasswordValidation.MatchPassword
      }
   )
    
}

}
