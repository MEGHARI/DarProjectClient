import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profileService.component'
import * as myGlobals from "../globals";
import { User } from "../models/user";
declare var $ : any;
@Component({
    selector: 'profile',
    providers: [ProfileService],
    templateUrl: './profile.component.html',
    styleUrls: ['./css/profile.component.css']
})
export class ProfileComponent implements OnInit {
    public user : User;
    constructor(private ProfileService : ProfileService) { }

    ngOnInit() { 
        this.setUser();
    }
    setUser(){
        if(localStorage.getItem("currentUser") === null){
            this.user = undefined;
        }else {
            let infUser = JSON.parse(localStorage.getItem("currentUser"))
            this.user= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["token"])
           
        }
       
    }
    reset(){
        this.setUser();
    }
}