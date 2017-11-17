import { Component, OnInit,Input } from '@angular/core';
import {User} from "../models/user"
import {Router} from "@angular/router"
import {UserService} from "../models/userService"
import {GameService} from "../models/gameService"
import { CompleterService, CompleterData } from 'ng2-completer';
declare var $:any;
@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    protected dataService: CompleterData;
    protected searchData = [];
    protected searchStr: string;
    private completerService: CompleterService;
    public  logged : boolean;
    public user : User;
    constructor(public router :Router,private userService : UserService,private gameService : GameService) { }

    ngOnInit() {
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
            this.user= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["token"])
            this.logged = true;
        }
       
    } 
    refreshData(){
        if(this.searchStr.length>5){
            this.userService.searchAddress(this.searchStr).subscribe(
            data => {
                this.searchData = [];
                data["games"].forEach(element => {
                this.searchData.push(element ["name"])
                })
                this.dataService = this.completerService.local(this.searchData, null, null);
            },
            error => {
                console.log(error)
                //this.searchData = [];
            });
        }
    }
    searchGamesLike(){

    }


}