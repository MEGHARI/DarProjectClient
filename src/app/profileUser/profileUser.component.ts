import { Component, OnInit } from '@angular/core';
import {User,Game,UserService,GameService} from "../models/index"
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from "@angular/forms";

@Component({
    selector: 'profile-user',
    templateUrl: './profileUser.component.html',
    styleUrls: ['./profileUser.component.css']
})
export class ProfileUserComponent implements OnInit {
    public formGroupMessage: FormGroup;
    games =[]
    myId : number;
    idProfile : number;
    noGames : boolean =false;
    user = {lastName : "",id : 0,picture:""}
    constructor(private userService : UserService,private gameService : GameService,
    private activatedRoute : ActivatedRoute,public formBuilder : FormBuilder
    ) { 
        this.activatedRoute.params.subscribe(params => {
            this.myId= params["idUser"];
            this.idProfile = +params["idProfile"]
            this.getGamesByUser(this.idProfile)
         });
    }

    ngOnInit() { 
        this.formGroupMessage = this.formBuilder.group({
            textMessage :['',Validators.minLength(1)]
        })
    }
    getGamesByUser(id : number){
        
                this.gameService.getGamesByUser(id).subscribe(
                    data => {
        
                        this.games=[];
                        if(data["games"]!==undefined){
                            console.log(data["games"])
                            data["games"].forEach(element => {
                                this.games.push(new Game(element["id_game"],element["game_name"],element["summary"],element["date_release"],
                            element["listPlatforms"],element["game_cover"]))
                            this.user.lastName = element['last_name']
                            this.user.id= element['id']
                            this.user.picture= element['url_picture']
                            });
                        }else {
                            this.noGames = true;
                        }
                    },
                    error =>{this.games=[]}
                )
    }
    send(infoMessage : any){
        if(infoMessage.textMessage.length>0){
            this.userService.sendMessageToUser(this.user.id,infoMessage.textMessage).subscribe(
            data => {
               
                toastr.success('Message envoyé', '', {positionClass: "toast-bottom-right"});
            },
            error => {
                toastr.success("Problème lors de l'envoi du message", '', {positionClass: "toast-bottom-right"});
                
            }

        )
        }
       
    }
}