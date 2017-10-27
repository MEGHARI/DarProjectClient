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
    formGroupSignup : FormGroup;
    user: User;
    loading = false;
    @Output() onShowModal : EventEmitter<void>= new EventEmitter<void>();

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
        postalCode : ['',[Validators.required,Validators.pattern("[0-9]{5,5}")]],
        dateOfBirth :['',Validators.required],
        image :[''],
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
    this.user = new User(
        infSignup.name,
        infSignup.firstName,
        infSignup.address,
        infSignup.dateOfBirth,
        infSignup.postalCode,
        infSignup.mail,
        infSignup.password);
        this.userService.create(this.user)
        .subscribe(
            data => {
                myGlobals.setSignupSuccess();
                this.hiddenModal();
                this.router.navigate(['/login']);    
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}

    hiddenModal(){
        this.clearDatasForm()
        this.onShowModal.emit();
    }

    clearDatasForm(){
        this.formGroupSignup.setValue({name: '', firstName:"",mail: '', address:"",postalCode: '',
    dateOfBirth:"",password:'',image:'',confirmPassword:''});
    }

}
