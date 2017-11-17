import { Component,OnInit ,Output,EventEmitter} from "@angular/core";
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import{Router} from "@angular/router";
import {PasswordValidation} from "./password.confirm"
import * as myGlobals from "../globals";
import {User} from '../models/index';
import {AlertService} from '../alert/index';
import {UserService} from '../models/index';
import { CompleterService, CompleterData } from 'ng2-completer';
declare var $:any;

@Component({
    templateUrl:"signup.component.html",
    styleUrls:["signup.component.css"],
    selector :"signup",
})
export class SignupComponent implements OnInit{
    errorAlert: boolean = false;
    formGroupSignup : FormGroup;
    public user : User;
    loading = false;
    public errors =[]
    // auto completer
    protected dataService: CompleterData;
    protected searchData = [];
    protected searchStr: string;
 
constructor(
    private completerService: CompleterService,
    public formBuilderSignup : FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService){
        this.dataService = completerService.local(this.searchData, null,null);
    }
    
 ngOnInit(){
   
    this.errors =[]
        if(!(localStorage.getItem("currentUser")===null)){
            this.router.navigate(["/home"])
        }
        this.formGroupSignup = this.formBuilderSignup.group({
        name : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
        firstName : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
        mail : ['',Validators.required],
        password:['',[Validators.required,Validators.minLength(6)]],
        address:[''],
        confirmPassword : ['',Validators.required]

    },{
        validator: PasswordValidation.MatchPassword
      })
    
    }

signup(infSignup :any) {
   
    this.loading = true;
        this.userService.create(({lastName : infSignup.name,firstName :infSignup.firstName,mail:infSignup.mail,address : this.searchStr,password : infSignup.password}))
        .subscribe(
            data => {           
                myGlobals.setSignupSuccess(true);
                this.router.navigate(['/login']);    
            },
            error => {
                this.errorAlert=true;
                console.log(error.json().errors)
                console.log(error.json().errors.length)
                for(var i:number=0;i<error.json().errors.length;++i){
                    this.errors.push(error.json().errors[i]["code"])
                    
                }
                this.loading = false;
            });
                
}

    clearDatasForm(){
        this.formGroupSignup.setValue({name: "", firstName:"",mail: "", address:"",
    password:"",confirmPassword:""});
    }

    refreshData(){
        if(this.searchStr.length>5){
            this.userService.searchAddress(this.searchStr).subscribe(
            data => {
                this.searchData = [];
                data["all_addresses"].forEach(element => {
                this.searchData.push(element ["address"])
                })
                this.dataService = this.completerService.local(this.searchData, null, null);
            },
            error => {
                console.log(error)
                //this.searchData = [];
            });
        }
    }


}






