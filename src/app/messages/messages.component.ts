import { Component, OnInit } from '@angular/core';
import {User} from "../models/user"
@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    public user : User;
    constructor() { }
    ngOnInit() { 
        this.setUser();
    }
    setUser(){
        let infUser = JSON.parse(localStorage.getItem("currentUser"))
        this.user= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["url_picture"],infUser["token"])
    }
    getMessages(){
        
    }
}