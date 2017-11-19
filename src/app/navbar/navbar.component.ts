import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {User} from "../models/user"
import {Router} from "@angular/router"
import {UserService} from "../models/userService"
import {GameService} from "../models/gameService"
import { CompleterService, CompleterData } from 'ng2-completer';
import * as myGlobals from "../globals";

declare var $:any;
@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    protected dataService: CompleterData;
    protected searchData = [];
    protected searchStr: string;
    public  logged : boolean;
    public user : User;
    public nbNotifications:number;
    public nbMessages:number;
    protected intervale;

    constructor(private completerService: CompleterService,
        public router :Router,
        private userService : UserService,
        private gameService : GameService)
        {
            this.intervale = setInterval(() => {this.getAllNotifications();},1000*19)
        }

    ngOnInit() {
        this.getCacheNotifications();
        this.setUser()
     }

    logOut(){
         
         this.userService.logout().subscribe(
             data =>{
                 console.log("success")
                 console.log(data)
             },
             error =>{console.log(error.json())}
         )
        localStorage.removeItem("currentUser")
        this.logged=false;
        this.router.navigate(["/home"]) 
        
     }
     setUser(){
        if(localStorage.getItem("currentUser") === null){
            this.logged = false;
        }else {
            let infUser = JSON.parse(localStorage.getItem("currentUser"))
            this.user= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["url_picture"],infUser["token"])
            this.logged = true;
        }
       
    } 
    refreshData(){
        if(this.searchStr.length>3){
            console.log("entré")
            this.gameService.autoSearchGames(this.searchStr).subscribe(
            data => {
                this.searchData = [];
                if(data["games"]){
                    data["games"].forEach(element => {
                        this.searchData.push(element["name"])
                    });
                }
                this.dataService = this.completerService.local(this.searchData, null, null);
            },
            error => {
                console.log(error.json())
                //this.searchData = [];
            });
        }
    }
    searchForExchanging(title : string){
        this.router.navigate(["/users/"+this.user.id+"/suggestions/"+title]);
       
    }

    getAllNotifications(){
        this.userService.getNotifications().subscribe(
            data => {
                console.log(data);
                myGlobals.setNbNotifications(data.notifications_count["system_count"]);
                myGlobals.setNbMessage(data.notifications_count["message_count"]);
                this.nbNotifications = myGlobals.nbNotifications
                this.nbMessages = myGlobals.nbMessages
            },
            error =>{
                console.log(error.json());
            }
        )
    }

    ngOnDestroy() {
        if (this.intervale) {
          clearInterval(this.intervale);
        }
    }

    getCacheNotifications(){
        this.nbMessages = myGlobals.nbMessages;
        this.nbNotifications = myGlobals.nbNotifications;
    }
}