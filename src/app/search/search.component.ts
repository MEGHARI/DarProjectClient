import { Component, OnInit, ElementRef } from '@angular/core';
import { DataNode } from './DataNode'
import {  GameService } from "../models/gameService";
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
    constructor(private gameService : GameService,private activatedRoute : ActivatedRoute,
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
        this.id=id;
        $('#modalDescription').on('show.bs.modal', function(e) {
            $('#modalDescription .modal-header #myModalLabel').html(name);
            $('#modalDescription .modal-body').html("Voulez vous ajouter le jeu "+
            "<b>"+name+"</b> à votre liste de jeux possédés ?");
        });
    }

    confirm(){
        $("#modalDescription").modal("hide");
    }
    setUser(){
        if(localStorage.getItem("currentUser") === null){
           this.user = undefined;
        }else {
            let infUser = JSON.parse(localStorage.getItem("currentUser"))
            this.user= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["token"])
           
        }
       
    } 

}