import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user"
import {UserService}  from "../../models/userService"
import {Router} from "@angular/router"
@Component({
    selector: 'navbar-admin',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarAdminComponent implements OnInit {
    admin : User;
    constructor(private userService :UserService, private router : Router) { }

    ngOnInit() { this.setUser()}
    setUser(){
        if(localStorage.getItem("currentUser") === null){
        this.admin=undefined;
        }else {
            let infUser = JSON.parse(localStorage.getItem("currentUser"))
            this.admin= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["token"])
            
        }
       
    } 
    logOut(){
  
        this.userService.logout().subscribe(
            data =>{
                    localStorage.removeItem("currentUser")
                    localStorage.removeItem("currentUser")
                    this.router.navigate(["/home"])
            
            },
            error =>{console.log(error.json())}
        )
       
        
    }
}

