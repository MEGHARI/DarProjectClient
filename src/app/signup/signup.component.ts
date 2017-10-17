import { Component,OnInit } from "@angular/core";
import {signupService} from "./signup.service";
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import{Router} from "@angular/router";
import {PasswordValidation} from "./password.confirm"
import * as myGlobals from "../globals";
@Component({

    templateUrl:"signup.component.html",
    styleUrls:["signup.component.css"],
    selector :"signup",
    providers :[signupService]
})
export class SignupComponent implements OnInit{
    formGroupSignup : FormGroup;
constructor(public formBuilderSignup : FormBuilder){}
 ngOnInit(){
    this.formGroupSignup = this.formBuilderSignup.group({

        name : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
        firstName : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
        mail : ['',Validators.required],
        postalCode : ['',[Validators.required,Validators.pattern("[0-9]{5,5}")]],
        dateOfBirth :['',Validators.required],
        image :[''],
        password:['',Validators.required],
        addresse :['',Validators.required],
        confirmPassword : ['',Validators.required]

    },{
        validator: PasswordValidation.MatchPassword
      }
   )
    
}

}
