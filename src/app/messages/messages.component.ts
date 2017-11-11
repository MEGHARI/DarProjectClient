import { Component, OnInit } from '@angular/core';
import {MessagesService} from "./messagesService"
import {User} from "../models/user"
@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    public user : User;
    constructor(public messageservice : MessagesService) { }
    ngOnInit() { 
        this.setUser();
    }
    setUser(){
        let infUser = JSON.parse(localStorage.getItem("currentUser"))
        this.user= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["token"])
    }
    getMessages(){
        
    }
}