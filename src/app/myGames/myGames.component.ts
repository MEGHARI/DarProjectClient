import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import {GameService} from "../models/gameService"
import {Game} from "../models/game"
@Component({
    selector: 'myGames',
    templateUrl: './myGames.component.html',
    styleUrls: ['./myGames.component.css']
})
export class MyGamesComponent implements OnInit {
    constructor(private gameservice : GameService) { }
    public user : User;
    public games = [];
    ngOnInit() {
        
        this.getGames();  
    }
    getGames(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
      this.gameservice.getGamesById().subscribe (
            data => {
                this.games = [];
                console.log(data);
               /* data["games"].forEach(element => {
                    console.log(element)
                });*/
            },
            error => {
                alert("no")
                console.log(error.json())
                this.games = [];
            }
        );
    }
}   
