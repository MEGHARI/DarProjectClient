import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profileService.component'
import * as myGlobals from "../globals";
import { User, UserService } from "../models/index";
import { CompleterService, CompleterData } from 'ng2-completer';
declare var $ : any;

@Component({
    selector: 'profile',
    providers: [ProfileService],
    templateUrl: './profile.component.html',
    styleUrls: ['./css/profile.component.css']
})
export class ProfileComponent implements OnInit {
    public user : User;
    protected dataService: CompleterData;
    protected searchData = [];
    protected searchStr: string;

    constructor(private ProfileService : ProfileService,
        private completerService: CompleterService,
        private userService : UserService) {
            this.dataService = completerService.local(this.searchData, null, null);
        }

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
            });
      }
    }
}