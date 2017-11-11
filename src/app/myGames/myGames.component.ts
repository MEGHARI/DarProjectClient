import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import {GameService} from "../models/gameService"
@Component({
    selector: 'myGames',
    templateUrl: './myGames.component.html',
    styleUrls: ['./myGames.component.css']
})
export class MyGamesComponent implements OnInit {
    constructor(private gameservice : GameService) { }
    public user : User;
    ngOnInit() {
        this.setUser()
     }
    setUser(){
        let infUser = JSON.parse(localStorage.getItem("currentUser"))
        this.user = new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["token"])
    }
    getGames(){
       // return this.gameservice.getGamesByUser().
    }
}