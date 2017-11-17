import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profileService.component'
import * as myGlobals from "../globals";
import { User, UserService } from "../models/index";
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import {PasswordValidation} from "../signup/password.confirm"
import { CompleterService, CompleterData } from 'ng2-completer';
declare var $ : any;

@Component({
    selector: 'profile',
    providers: [ProfileService],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    errors =[]
    public user : User;
    protected dataService: CompleterData;
    protected searchData = [];
    protected adresseStr: string;
    formGroupUpdate : FormGroup
    constructor(private ProfileService : ProfileService,
        private completerService: CompleterService,
        private userService : UserService,
        private formBuilder : FormBuilder) {
            this.dataService = completerService.local(this.searchData, null, null);
        }

    ngOnInit() { 
        this.errors =[]
        this.setUser();
        this.formGroupUpdate = this.formBuilder.group({
            name : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
            firstName : ['',[Validators.required,Validators.pattern("[a-zA-Z]{3,}")]],
            mail : ['',Validators.required],
            password:['',[Validators.required,Validators.minLength(6)]],
            address:[''],
            confirmPassword : ['',Validators.required],
            avatar: null
        },{
            validator: PasswordValidation.MatchPassword
          })
        
    }
    setUser(){
        if(localStorage.getItem("currentUser") === null){
            this.user = undefined;
        }else {
            let infUser = JSON.parse(localStorage.getItem("currentUser"))
            this.adresseStr = infUser["address"];
            this.user= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["url_picture"],infUser["token"])
        }
    }

    onFileChange(event) {
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
          let file = event.target.files[0];
          reader.readAsDataURL(file);
          console.log(reader.result.split(',')[1])
          reader.onload = () => {
            this.formGroupUpdate.get('avatar').setValue({
              filename: file.name,
              filetype: file.type,
              value: reader.result.split(',')[1]
            })
            /*this.http.post('http://ec2-54-191-113-82.us-west-2.compute.amazonaws.com:8080/DarProject/UploadImageServlet', this.form.value).subscribe(
              data => console.log(data),
              error => console.log(error)
            )*/
          };
        }
      }
    
      update() {
        this.userService.update(this.formGroupUpdate.value).subscribe(
            data => {
                console.log(data)
            },
            error => console.log(error)
        )
      }
      
    refreshData(){
        if(this.adresseStr.length>5){
            this.userService.searchAddress(this.adresseStr).subscribe(
            data => {
                this.searchData = [];
                data["all_addresses"].forEach(element => {
                this.searchData.push(element ["address"])
                })
                this.dataService = this.completerService.local(this.searchData, null, null);
            },
            error => {
                console.log(error)
            });
      }
    }
    cancel(){
        this.formGroupUpdate.setValue({name: this.user.lastName, firstName:this.user.firstName,mail:this.user.mail,
             address:this.user.address,
        password:"******",confirmPassword:"******"});
    }
}