import { Component, OnInit } from '@angular/core';
import {User,Game,UserService,GameService} from "../models/index"
import { Router,ActivatedRoute } from '@angular/router';
@Component({
    selector: 'profile-user',
    templateUrl: './profileUser.component.html',
    styleUrls: ['./profileUser.component.css']
})
export class ProfileUserComponent implements OnInit {
    games =[]
    myId : number;
    idProfile : number;
    constructor(private userService : UserService,private gameService : GameService,
    private activatedRoute : ActivatedRoute
    ) { 
        this.activatedRoute.params.subscribe(params => {
            this.myId= params["idUser"];
            this.idProfile = +params["idProfile"]
            this.getGamesByUser(this.idProfile)
         });
    }

    ngOnInit() { }
    getGamesByUser(id : number){
        
                this.gameService.getGamesByUser(id).subscribe(
                    data => {
        
                        this.games=[];
                        if(data["games"]!==undefined){
                            data["games"].forEach(element => {
                                this.games.push(new Game(element["id_game"],element["game_name"],element["summary"],element["date_release"],
                            element["listPlatforms"],element["game_cover"]))
                            });
                        }
                    },
                    error =>{this.games=[]}
                )
            }
}