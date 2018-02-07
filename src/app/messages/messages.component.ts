import { Component, OnInit, OnDestroy } from '@angular/core';
import {User, UserService} from "../models/index"
import { Router, ActivatedRoute ,NavigationEnd} from '@angular/router';
@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
    public user : User;
    public idReceiver : number;
    public messageText : string;
    public page :number;
    public messages = [];
    public conversations = [];
    protected intervale;

    constructor(private userService:UserService,private router :Router) {
            // this.intervale = setInterval(() => {this.refreshMessage(this.idReceiver);},1000*5)
    }
    ngOnInit() { 
        this.setUser();
        this.getConversations();
        console.log(this.conversations.length);
    }
    setUser(){
        let infUser = JSON.parse(localStorage.getItem("currentUser"))
        this.user= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["url_picture"],infUser["token"])
    }

    getMessages(id:number){
        this.page = 1;
        this.messages = [];
        this.idReceiver = id;
        this.userService.getMessage(id,this.page).subscribe(
            data =>{
                console.log(data)
                data.messages.reverse();
                data.messages.forEach(e => {
                    this.messages.push(e)
                });
            },
            error =>{
                console.log();
            }
        )
    }

    refreshMessage(id:number){
        //if(this.router.url.match("/users/[0-9]+/messages")){
        this.idReceiver = id;
        this.userService.getMessage(id,1).subscribe(
            data =>{
                console.log(data)
                data.messages.reverse();
                data.messages.forEach(e => {
                    let find = false;
                    this.messages.forEach(e2=>{
                        if(e2["_id"] == e["_id"]){
                            find=true;
                        }
                    })
                    if(!find)
                        this.messages.push(e)
                });
            },
            error =>{
                console.log();
            }
        )
    //}
    }

    getConversations(){
        this.userService.getConversations().subscribe(
            data => {
                console.log(data)
                data["conversations"].forEach(e => {
                    if(e["_id"] != 0){
                        this.conversations.push({firstName : e["firstName"],
                    lastName: e["lastName"], id: e["_id"], count: e["count"],
                urlPicture: e["url_picture"]});
                    }
                });
                
                if(this.conversations.length != 0)
                    this.getMessages(this.conversations[0]["id"])
            },
            error => {
                console.log(error.json())
            }
        )
    }

    sendMessage(){
        console.log(this.idReceiver + " " +this.messageText)
        if(this.messageText.length>0){
            this.userService.sendMessageToUser(this.idReceiver, this.messageText).subscribe(
                data => {
                    this.messages.push({
                        message : data["message"],
                        date: data["date"],
                        id_receiver : data["id_receiver"],
                        id_sender : data["id_sender"],
                        url_picture : this.user["urlPicture"],
                        _id : data["_id"],
                    })
                },
                error => {

                }
            )
        }
    }

    onScroll(){
        this.page++;
        this.userService.getMessage(this.idReceiver,this.page).subscribe(
            data =>{
                console.log(data)
                data.messages.forEach(e => {
                    this.messages.unshift(e)
                });
            },
            error =>{
                console.log();
            }
        )
    }

    ngOnDestroy() {
        if (this.intervale) {
          clearInterval(this.intervale);
        }
    }
}