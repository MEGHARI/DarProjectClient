import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user"
@Component({
    selector: 'navbar-admin',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarAdminComponent implements OnInit {
    admin : User;
    constructor() { }

    ngOnInit() { this.setUser()}
    setUser(){
        if(localStorage.getItem("currentUser") === null){
        this.admin=undefined;
        }else {
            let infUser = JSON.parse(localStorage.getItem("currentUser"))
            this.admin= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["token"])
            
        }
       
    } 
}

