import { Component, OnInit, ElementRef } from '@angular/core';
import { DataNode } from './DataNode'
import {  GameService } from "../models/gameService";
import {Game} from "../models/game"
import { Router, ActivatedRoute ,NavigationEnd} from '@angular/router';
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
    public name : string;
    public id:number;
    constructor(private gameservice : GameService,private activatedRoute : ActivatedRoute,
        private elRef:ElementRef) { }

    ngOnInit() { 
        this.activatedRoute.params.subscribe(params => this.name= params["name"]);
        this.gameservice.searchGame(this.name,this.offset).subscribe(
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
            
            //this.games.push(new DataNode(element.name,element.summary, ""));
            //this.games.push(element)
        });

        console.log(this.games);
    }

    onScroll () {
        console.log('scrolled!!')
        this.offset +=10;
        this.gameservice.searchGame(this.name,this.offset).subscribe(
            data => this.traitement(data["games"]),
            error => console.log(error),
            () => console.log('aaa')
        );
        console.log();
    }

    dynamicModal(id:number,name:string){
        console.log(id)
        this.id=id;
        $('#modalDescription').on('show.bs.modal', function(e) {
            $('#modalDescription .modal-header #myModalLabel').html(name);
            $('#modalDescription .modal-body').html("Voulez vous ajouter le jeu "+
            "<b>"+name+"</b> à votre liste de jeux possédés ?");
        });
    }

    confirm(){
        console.log(this.id);
        $("#modalDescription").modal("hide");
    }
}