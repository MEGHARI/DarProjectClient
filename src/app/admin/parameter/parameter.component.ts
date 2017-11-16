import { Component, OnInit } from '@angular/core';
import {UserService} from "../../models/userService"
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import {PasswordValidation} from "../../signup/password.confirm"
import {User} from "../../models/user"
@Component({
    selector: 'parametre',
    templateUrl: './parameter.component.html',
    styleUrls: ['./parameter.component.css']
})
export class ParameterAdminComponent implements OnInit {
    loading :boolean;
    formGroupSignup : FormGroup;
    public errors =[]
    users = [];
    constructor(private userService : UserService,public formBuilderSignup : FormBuilder) { }

    ngOnInit() {
        this.getAdmins();
        this.formGroupSignup = this.formBuilderSignup.group({
            name : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
            firstName : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
            mail : ['',Validators.required],
            password:['',[Validators.required,Validators.minLength(6)]],
            address:['',Validators.required],
            confirmPassword : ['',Validators.required]
    
        },{
            validator: PasswordValidation.MatchPassword
          })
     }

    createAdmin(infSignup : any){
        alert("creation")
        this.loading = true;
        this.userService.createAdmin(({lastName : infSignup.name,firstName :infSignup.firstName,mail:infSignup.mail,address : infSignup.address,password : infSignup.password}))
        .subscribe(
            data => {           
                //this.router.navigate(['/login']);    
            },
            error => {
                console.log(error.json().errors)
                console.log(error.json().errors.length)
                for(var i:number=0;i<error.json().errors.length;++i){
                    this.errors.push(error.json().errors[i]["code"])
                    
                }
                this.loading = false;
            });
    }

    getAdmins(){
        this.userService.getAllAdmins().subscribe(
            data => {console.log(data)},
            error => {console.log(error.json())}
        )
    }
}