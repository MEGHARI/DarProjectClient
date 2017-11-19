import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {GameService} from "../models/gameService"
import {UserService} from "../models/userService"
import {IMyDrpOptions} from 'mydaterangepicker';
declare var $ : any
@Component({
    selector: 'suggestion',
    templateUrl: './gamesSuggested.component.html',
    styleUrls: ['./gamesSuggested.component.css']
})
export class GamesSuggestedComponent implements OnInit {
    idGameUser : number = -1;
    selected :number = -1;
    gamesUsers = [];
    games = []
    myId : number;
    error :boolean;
    addressReceiver ;
    distanceUsers = {distance : "",duration :""};
    myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
    };

    private model: any = {beginDate: {year:new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay()},
                            endDate: {year:new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay()}};

    constructor(private activatedRoute: ActivatedRoute,private router : Router,
        private gameService :GameService,private userService :UserService) {
            this.activatedRoute.params.subscribe(params => {
                let title= params["title"];
                this.myId = +params["id"]
                
                console.log(title)
                this.getSuggestions(title);
             });
          
    
     }

    ngOnInit() { 
        //console.log(this.getMyaddress())
    }
    getSuggestions(title : string){
        this.gamesUsers =[]
        this.gameService.getGamesExchenged(title).subscribe(
            data =>{console.log(data);
                data["games_suggested"].forEach(element => {
                this.gamesUsers.push({
                    gameName : element["game_name"],idGameUser : element["id_game_user"],
                    platform : element["platforme_name"], address : element["adress"],image : element["cover"]
                    ,summary : element["summary"],firstName :element["first_name"],lastName :element["last_name"],idUser:element["id_user"]
                })
            });
        },
            error => (console.log(error) )
        )
    }
    exchange(gameUId){
        this.idGameUser = gameUId;
        this.getGames()
    }

    getGames(){
      this.userService.getGames().subscribe (
            data => {
                console.log(data)
                this.games = [];
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
    confirm(myIdGameUser){
        if(this.model){
            console.log(myIdGameUser)
            console.log(this.idGameUser)
            let dateExchage = this.model.beginDate.day+"-"+this.model.beginDate.month+"-"+this.model.beginDate.year;
            let dateReturn =  this.model.endDate.day+"-"+this.model.endDate.month+"-"+this.model.endDate.year;
                this.userService.createGameExchanges({idGameUserSender:myIdGameUser,
                    idGameUserReceiver:this.idGameUser,dateExchange:dateExchage,dateRetrun:dateReturn}).subscribe(
                        data => { 
                            this.error = false;
                            $("#modalExchange").modal("hide");
                            toastr.success("Demande d'échange envoyée", '', {positionClass: "toast-bottom-right"});
                            },
                        error => {
                            if(error.json().error["code"]==17) {
                                $("#modalExchange").modal("hide");
                                toastr.error("Vous avez déja effectué cette demande d'échange", '', {positionClass: "toast-bottom-right"})                                
                            }
                            else if (error.json().error["code"]==8)
                                this.error = true;
                            else 
                                toastr.error("Erreur", '', {positionClass: "toast-bottom-right"})
                        }
                    )
                   
          
        }
       
    }
    select(id){
     this.selected = id;
    }

    getMyaddress(){
        return JSON.parse(localStorage.getItem("currentUser"))["address"]
    }
    annuler(){
        this.error = false;
    }
    onChange(mode,addressReceiver) {
        if(mode =="voiture"){
            this.userService.getDistance(this.getMyaddress(),addressReceiver,"driving").subscribe(
                data => {
                    console.log(data)
                    this.distanceUsers ={duration : data["distance_duration"][0]["duration"],distance :data["distance_duration"][0]["distance"]};
                },
                error => {
                    this.distanceUsers ={duration : "Non définie",distance :"Non définie" };
                    
                }
            )
            toastr.info("Durée "+this.distanceUsers.duration+"<br />"+"Distance"+this.distanceUsers.distance)
            
        }else if (mode ="marche"){

            this.userService.getDistance(this.getMyaddress(),addressReceiver,"walking").subscribe(
                data => {
                    this.distanceUsers ={duration : data["distance_duration"][0]["duration"]===undefined?"indisponoble":data["distance_duration"][0]["duration"],distance :data["distance_duration"][0]["distance"]===""?"indisponible":data["distance_duration"][0]["distance"]};
                },
                error => {
                    this.distanceUsers ={duration : "Non définie",distance :"Non définie" };
                    
                }
            )
            toastr.info("Durée "+this.distanceUsers.duration+"<br />"+"Distance"+this.distanceUsers.distance)
            

        }else if (mode="transport public"){
            this.userService.getDistance(this.getMyaddress(),addressReceiver,"transit").subscribe(
                data => {
                    this.distanceUsers ={duration : data["distance_duration"][0]["duration"],distance :data["distance_duration"][0]["distance"]};
                },
                error => {
                    this.distanceUsers ={duration : "Non définie",distance :"Non définie" };
                    
                }
               
            )
            toastr.info("Durée "+this.distanceUsers.duration+"<br />"+"Distance"+this.distanceUsers.distance)

        }else if(mode="vélo"){
            this.userService.getDistance(this.getMyaddress(),addressReceiver,"bicycling").subscribe(
                data => {
                    this.distanceUsers ={duration : data["distance_duration"][0]["duration"],distance :data["distance_duration"][0]["distance"]};
                },
                error => {
                    this.distanceUsers ={duration : "Non définie",distance :"Non définie" };
                    
                }
            )
            toastr.info("Durée "+this.distanceUsers.duration+"<br />"+"Distance"+this.distanceUsers.distance)
            

        }
        console.log(this.distanceUsers)
    }

}