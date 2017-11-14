import { Component, OnInit,Input } from '@angular/core';
import {User} from "../models/user"
import {Router} from "@angular/router"
@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public  logged : boolean;
    public user : User;
    constructor(public router :Router) { }

    ngOnInit() {
        this.setUser()
     }
     logOut(){
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


}