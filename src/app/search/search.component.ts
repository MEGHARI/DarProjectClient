import { Component, OnInit, ElementRef } from '@angular/core';
import { DataNode } from './DataNode'
import {  PlatformService, GameService, UserService  } from "../models/index";
import {Game} from "../models/game"
import { Router, ActivatedRoute ,NavigationEnd} from '@angular/router';
import {User} from "../models/user"
declare var $:any;

@Component({
    selector: 'search-list',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    private router : Router;
    games = [];
    offset = 0;
    public user : User;
    public name : string;
    public id:number;
    public idGamePlatform = 0;
    public platforms = [];
    constructor(private gameService : GameService, private platformService : PlatformService,
        private userService: UserService,
        private activatedRoute : ActivatedRoute,
        private elRef:ElementRef) { }

    ngOnInit() { 
        this.setUser()
        this.activatedRoute.params.subscribe(params => this.name= params["name"]);
        this.gameService.searchGame(this.name,this.offset).subscribe(
            data => this.traitement(data["games"]),
            error => console.log(error),
        );
    }


    traitement(data){
        console.log(data);
        
       data.forEach(element => {
        console.log(element)
            this.games.push(new Game(element["id"],element["name"],element["summary"],
            element["first_release_date"],element["platform"],element["cover"]))
        });

        console.log(this.games);
    }

    onScroll () {
        this.offset +=10;
        this.gameService.searchGame(this.name,this.offset).subscribe(
            data => this.traitement(data["games"]),
            error => console.log(error),
        );
    }

    dynamicModal(id:number,name:string){
        //Request GET to get all platforms of a games
        //gameUser/getPlateforms
        /*
            <select id="select">
                <option value="valeur1">Valeur 1</option> 
                <option value="valeur2" selected>Valeur 2</option>
                <option value="valeur3">Valeur 3</option>
            </select>
        */
        this.platforms = [];
        this.platformService.getPlatformsByGame(id).subscribe(
            data => {
                console.log(data);
                data.platforms.forEach(e =>{
                    this.platforms.push(e);
                });
            },
            error => console.log(error),
        );
        this.id=id;
    
        $('#modalDescription').on('show.bs.modal', function(e) {
            $('#modalDescription .modal-header #myModalLabel').html(name);
            $('#modalDescription .modal-body #gameName').html(name);
        });
    }

    confirm(idGame){
        this.userService.addGameUser(this.idGamePlatform,1).subscribe(
            data => {
                console.log(data);
                //Afficher un toast comme quoi il a réussit l'ajout
                toastr.success('Jeux ajouté avec succès', '', {positionClass: "toast-bottom-right"});
                this.idGamePlatform = 0;
                
            },
            error => {
                console.log(error);}
        );
        console.log(idGame+" + "+this.idGamePlatform);
        $("#modalDescription").modal("hide");
    }
    
    setUser(){
        if(localStorage.getItem("currentUser") === null){
           this.user = undefined;
        }else {
            let infUser = JSON.parse(localStorage.getItem("currentUser"))
            this.user= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["url_picture"],infUser["token"])
           
        }
       
    } 

}