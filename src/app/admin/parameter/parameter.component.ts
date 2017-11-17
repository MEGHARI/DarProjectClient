import { Component, OnInit } from '@angular/core';
import {UserService} from "../../models/userService"
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import {PasswordValidation} from "../../signup/password.confirm"
import {User} from "../../models/user"
import { CompleterService, CompleterData } from 'ng2-completer';
@Component({
    selector: 'parametre',
    templateUrl: './parameter.component.html',
    styleUrls: ['./parameter.component.css']
})
export class ParameterAdminComponent implements OnInit {
    loading :boolean;
    formGroupSignup : FormGroup;
    public errors =[]
    admins= [];
    protected dataService: CompleterData;
    protected searchData = [];
    protected searchStr: string;
    constructor( private completerService: CompleterService,private userService : UserService,public formBuilderSignup : FormBuilder) { }

    ngOnInit() {

        this.getAdmins();
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
          this.dataService = this.completerService.local(this.searchData, null,null);
     }

    createAdmin(infSignup : any){
        alert("creation")
        this.loading = true;
        this.userService.createAdmin(({lastName : infSignup.name,firstName :infSignup.firstName,mail:infSignup.mail,address :this.searchStr,password : infSignup.password}))
        .subscribe(
            data => {           
               this.admins.push(new User(infSignup.lastName, infSignup.firstName,this.searchStr,infSignup.mail, infSignup.id, infSignup.status,"token")) 
               this.loading = false; 
               this.clearDatasForm();
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
            
            data => { console.log(data["admins"]);  data["admins"].forEach(element => {
                this.admins.push(new User(element["last_name"],element["firstName"], element["address"],element["email"], element["id_admin"],element["status"],element["token"]));
            });},
            error => {console.log(error.json())}
        )
    }

    clearDatasForm(){
        this.formGroupSignup.setValue({name: "", firstName:"",mail: "", address:"",
    password:"",confirmPassword:""});
    }

    refreshData(){
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
          }
      );
      }
}