import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import {UserService} from "../../models/userService"
declare var $:any;
@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersAdminComponent implements OnInit {
    idAdmin: number;//curent admin.id
    idGame: number;
    constructor(private activatedRoute: ActivatedRoute,private router : Router,private userService :UserService) {
       if(this.router.url.match("/admin/[0-9]+/users")){
        this.activatedRoute.params.subscribe(params => {
            this.idAdmin = +params['idAdmin']; // (+) converts string 'id' to a number
     
         });
       }else if(this.router.url.match("/admin/[0-9]+/games/[0-9]+/users")){
        this.activatedRoute.params.subscribe(params => {
            this.idAdmin = +params['idAdmin']; // (+) converts string 'id' to a number
            this.idGame = +params['idGame']
            console.log(this.idAdmin+"   "+this.idGame)
     
         });
       }else{
           this.router.navigate(['/admin/home'])
       }

      }
    

    ngOnInit() { 
       this.animate()
    }
    animate(){
        $(document).ready(function() {
            var panels = $('.user-infos');
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
        
        
            $('[data-toggle="tooltip"]').tooltip();
        });
    }
}