import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import {UserService} from "../../models/userService"
import {GameService} from "../../models/gameService"
import {User} from "../../models/user"
import { FormBuilder,FormControl,FormGroup,Validators } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var $:any;
@Component({
    selector: 'users',
    templateUrl: './gameUsers.component.html',
    styleUrls: ['./gameUsers.component.css']  
})
export class GameUsersComponent implements OnInit {
   
    public formGroupMessage: FormGroup;
    user : User;
    users = [];
    idAdmin : number;
    constructor(private activatedRoute: ActivatedRoute,private router : Router,
        public formBuilder : FormBuilder,private userService :UserService,
    private gameService :GameService) {

       if(this.router.url.match("/admin/[0-9]+/games/[0-9]+/users")){
        this.activatedRoute.params.subscribe(params => {
            let idGame = +params["idGame"];
            this.idAdmin = +params["idAdmin"]
            this.getUsersByGame(idGame);
     
         });
       }

      }
    

    ngOnInit() { 
        
        $('[data-toggle="tooltip"]').tooltip();
        this.formGroupMessage = this.formBuilder.group({
            textMessage :['',Validators.required]
        })
    }
    animate(id){
        $(document).ready(function() {
            var panels = $('.'+id);
            var panelsButton = $('.dropdown-user');
            panels.hide();
            //Click dropdown
            panelsButton.click(function() {
                //get data-for attribute
                var dataFor = $(this).attr('data-for');
                var idFor = $(dataFor);
        
                //current button
                var currentButton = $(this);
                idFor.slideToggle(400, function() {
                    //Completed slidetoggle
                    if(idFor.is(':visible'))
                    {
                        currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
                    }
                    else
                    {
                        currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
                    }
                })
            });
        
            
        });
    }


    bann(us:User){
        this.user = us;
        $('#modalBanned').on('show.bs.modal', function(e) {
            $('#modalBanned .modal-header #myModalLabel').html(us.lastName);
            $('#modalBanned .modal-body').html("Voulez vous vraiment bannir"+
            "<b>  "+us.lastName+"  "+us.firstName+" </b> à votre liste de jeux possédés ?");
            
        });
        
    }
    unbann(us:User){
        this.user = us;
        $('#modalBanned').on('show.bs.modal', function(e) {
            $('#modalBanned .modal-header #myModalLabel').html(us.lastName);
            $('#modalBanned .modal-body').html("Voulez vous vraiment remétre"+
            "<b>  "+us.lastName+"  "+us.firstName+" </b> ?");
        });
    }
    confirm(){
        if(this.user.status==1){
            console.log(true)
            this.userService.bannUser(this.user.id).subscribe(
                data => {
                    console.log(data)
                    for(let us of this.users){
                        if(us.id == this.user.id){
                            us.status = -1;
                            console.log(us.id)
                            this.user.status=-1;
                            $("#modalBanned").modal("hide");
                            toastr.success(this.user.firstName+' bannis', '', {positionClass: "toast-bottom-center"});
                        }
                    }
                   
                    
                    
                },
                error => {
                    $("#modalBanned").modal("hide");
                    toastr.error(error.json()["message"]+" ", '') 
                }
            )
        }else if(this.user.status==-1){
            this.userService.unbannUser(this.user.id).subscribe(    
                data => {
                    console.log(data)
                    for(let us of this.users){
                        if(us.id == this.user.id){
                            us.status = 1;
                            this.user.status=1;
                            $("#modalBanned").modal("hide");
                            toastr.success(this.user.firstName+' remis', '', {positionClass: "toast-bottom-center"});
                            
                        }
                    }

                   
               
                },
                error => {
                    $("#modalBanned").modal("hide");
                    toastr.error(error.json()["message"]+" ", '') 
                   
                }
            )
        }
    }
    sendMessage(us:User){
        this.user = us;   
    }
    send(infoMessage : any){
        this.userService.sendMessageToUser(this.user.id,infoMessage.textMessage).subscribe(
            data => {
                $("#modalMessage").modal("hide");
                toastr.success('message envoyé', '', {positionClass: "toast-bottom-center"});
            },
            error => {
                $("#modalMessage").modal("hide");
                toastr.error(error.json()["message"]+" ", '') 
                
            }

        )
    }

    getUsersByGame(id : number){
        this.userService.getUsersByGame(id).subscribe(
            data => {
                this.users= [];
                if(data["users"]!=undefined) {
                    data["users"].forEach(element => {
                        this.users.push(new User(element["first_name"],element["last_name"],
                        element["address"],element["mail"],element["id"],element["statut"],element['url_picture'],element["token"]))
                            
                    })
                } },
            error => {this.users=[]}
        )
    }
   
}
