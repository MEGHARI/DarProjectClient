import { Component, OnInit } from '@angular/core';
import {GameService} from "../../models/gameService"
import {Game} from "../../models/game"
@Component({  
    selector: 'games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.css']
})
export class GamesAdminComponent implements OnInit {
    game :Game;
    games =[];
    constructor(private gameService : GameService) { }
    ngOnInit() {this.listGames() }
    listGames(){
        this.gameService.getAllGames().subscribe(
            data => {
                if(data["games"]==undefined){
                    console.log(true)
                } else {
                    data["games"].forEach(element => {
                        this.games.push(new Game(element["id"],element["title"],element["overview"],element["dateRelease"],
                    element["platform"],element["cover"]))
                    });
                }
            },
            error =>{console.log(error)}
        )
    }
}