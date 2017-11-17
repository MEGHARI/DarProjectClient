import { Component, OnInit } from '@angular/core';
import {UserService} from "../../models/userService"
import {GameService} from "../../models/gameService"
import {Game} from "../../models/game"
import { Router,ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({  
    selector: 'games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.css']
})
export class GamesAdminComponent implements OnInit {
    public  idGame :number;
    games = [];
    idAdmin: number;
    constructor(private gameService : GameService,private userService :UserService,
        private router:Router,private activatedRoute : ActivatedRoute) { 
            this.idAdmin = JSON.parse(localStorage.getItem("currentUser"))["id"];
            console.log(this.idAdmin)
        }
   
    ngOnInit() {this.listGames() ;}
    listGames(){
        this.gameService.getAllGames().subscribe(
            data => {
                this.games=[];
                if(data["games"]==undefined){
                   //nothing to do
                } else {
                    data["games"].forEach(element => {
                        this.games.push(new Game(element["id_game"],element["game_name"],element["summary"],element["date_release"],
                    element["listPlatforms"],element["game_cover"]))
                    console.log(element)
                    });
                }
            },
            error =>{this.games=[]}
        )
    }
    detail(ga :Game){
        this.idGame = ga.id; 
            $('#product_view').on('show.bs.modal', function(e) {
                $('.modal-title').html(ga.title);
                $('#image').attr("src","http:"+ga.image);
                $('#summary').html(ga.overview);
                $('#users').html("liste d'utilisateurs");
                //$('#users').attr("href","admin/"+JSON.parse(localStorage.getItem("currentUser"))["id"]+"/games/"+ga.id+"/users")
             });
    }

    hidenMoal(){
        $( "a" ).click(function( event ) {
            event.preventDefault();
          });
        $("#product_view").modal("hide");
    }

}
