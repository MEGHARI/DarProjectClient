import { Component,OnInit ,Output,EventEmitter} from "@angular/core";
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import{Router} from "@angular/router";
import {PasswordValidation} from "./password.confirm"
import * as myGlobals from "../globals";
import {User} from '../models/index';
import {AlertService} from '../alert/index';
import {UserService} from '../models/index';
import "rxjs/add/operator/map"
@Component({

    templateUrl:"signup.component.html",
    styleUrls:["signup.component.css"],
    selector :"signup",
})
export class SignupComponent implements OnInit{
    errorAlert: boolean = false;
    formGroupSignup : FormGroup;
    user: User;
    loading = false;

constructor(
    public formBuilderSignup : FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService){}
    
 ngOnInit(){
        this.formGroupSignup = this.formBuilderSignup.group({
        name : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
        firstName : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
        mail : ['',Validators.required],
        password:['',Validators.required],
        address:['',Validators.required],
        confirmPassword : ['',Validators.required]

    },{
        validator: PasswordValidation.MatchPassword
      }
   )
    
}

signup(infSignup :any) {
    this.loading = true;
        this.userService.create(({lastName : infSignup.name,firstName :infSignup.firstName,mail:infSignup.mail,addresse : infSignup.address,password : infSignup.password}))
        .subscribe(
            data => {           
                myGlobals.setSignupSuccess();
                this.router.navigate(['/login']);    
            },
            error => {
                console.log("whatever")
                this.errorAlert=true;
                //this.alertService.error(error);
                this.loading = false;
            });
}

    clearDatasForm(){
        this.formGroupSignup.setValue({name: "", firstName:"",mail: "", address:"",
    password:"",confirmPassword:""});
    }

}
