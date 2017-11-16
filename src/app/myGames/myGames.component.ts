import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import {GameService, UserService} from "../models/index"
import {Game} from "../models/game"
declare var $:any;

@Component({
    selector: 'myGames',
    templateUrl: './myGames.component.html',
    styleUrls: ['./myGames.component.css']
})
export class MyGamesComponent implements OnInit {
    constructor(private gameservice : GameService, private userService : UserService) { }
    public user : User;
    public games = [];
    public id :string;
    ngOnInit() {
        this.getGames();  
    }
    getGames(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
      this.userService.getGames().subscribe (
            data => {
                //this.games = [];
                console.log(data);
                data.games.forEach(element => {
                    this.games.push(element);
                });
            },
            error => {
                console.log(error.json())
                this.games = [];
            }
        );
    }

    dynamicModal(id:string,name:string, platform:string){
        //Request GET to get all platforms of a games
        //gameUser/getPlateforms
        /*
            <select id="select">
                <option value="valeur1">Valeur 1</option> 
                <option value="valeur2" selected>Valeur 2</option>
                <option value="valeur3">Valeur 3</option>
            </select>
        */
        //this.platforms = [];
        /*this.platformService.getPlatformsByGame(id).subscribe(
            data => {
                console.log(data);
                data.platforms.forEach(e =>{
                    this.platforms.push(e);
                });
            },
            error => console.log(error),
        );*/
        this.id=id;
        console.log(id);
        $('#modalDescription').on('show.bs.modal', function(e) {
            $('#modalDescription .modal-header #myModalLabel').html(name);
            $('#modalDescription .modal-body #gameName').html(name);
            $('#modalDescription .modal-body #platform').html(platform);
        });
    }

    confirmDelete(){
        this.userService.deleteGameUser(this.id).subscribe(
            data => {
                console.log(data);
                var i = 0;
                for(let game of this.games){
                    if(game.id == this.id){
                        this.games.splice(i,1);
                        break;
                    }
                    i++;
                }
                //Afficher un toast comme quoi il a réussit l'ajout
            },
            error => {
                console.log(error);
            });
        //console.log(idGame+" + "+this.idGamePlatform);
        $("#modalDescription").modal("hide");
    }
}   
