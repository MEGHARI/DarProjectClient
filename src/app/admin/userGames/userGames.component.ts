import { Component, OnInit } from '@angular/core';
import {UserService} from "../../models/userService"
import {GameService} from "../../models/gameService"
import {Game} from "../../models/game"
import { Router,ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({  
    selector: 'games',
    templateUrl: './userGames.component.html',
    styleUrls: ['./userGames.component.css']
})
export class UserGamesComponent implements OnInit {
    game :Game;
    games = [];
    idAdmin : number;
    constructor(private gameService : GameService,private userService :UserService,
        private router:Router,private activatedRoute : ActivatedRoute) { 
        if(this.router.url.match("/admin/[0-9]+/users/[0-9]+/games")){
             this.activatedRoute.params.subscribe(params => {
                 this.idAdmin = +params['idAdmin']
                 this.getGamesByUser(+params["idUser"]);
              });
            }
    }
    ngOnInit() {}
    detail(ga :Game){
        this.game  = ga;
            $('#product_view').on('show.bs.modal', function(e) {
                $('.modal-title').html(ga.title);
                $('#image').attr("src","http:"+ga.image);
                $('#summary').html(ga.overview);
                $('#users').html("liste d'utilisateurs");
                $('#users').attr("href","admin/"+JSON.parse(localStorage.getItem("currentUser"))["id"]+"/games/"+ga.id+"/users")
             });
    }
    getGamesByUser(id : number){

        this.gameService.getGamesByUser(id).subscribe(
            data => {

                this.games=[];
                if(data["games"]!==undefined){
                    data["games"].forEach(element => {
                        this.games.push(new Game(element["id_game"],element["game_name"],element["summary"],element["date_release"],
                    element["listPlatforms"],element["game_cover"]))
                    console.log(element)
                    });
                    console.log()
                }
            },
            error =>{this.games=[]}
        )
    }
}
