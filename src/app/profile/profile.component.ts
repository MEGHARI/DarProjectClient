import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profileService.component'
import * as myGlobals from "../globals";
import { User } from "../models/user";
declare var $ : any;
@Component({
    selector: 'profile',
    providers: [ProfileService],
    templateUrl: './profile.component.html',
    styleUrls: ['./css/profile.component.css']
})
export class ProfileComponent implements OnInit {
    public user : User;
    constructor(private ProfileService : ProfileService) { }

    ngOnInit() { 
       this.setUser()       
        $('input[id=base-input]').change(function() {
            $('#fake-input').val($(this).val().replace("C:\\fakepath\\", ""));
        });
    
        $('input[id=main-input]').change(function() {
            console.log($(this).val());
            var mainValue = $(this).val();
            if(mainValue == ""){
                document.getElementById("fake-btn").innerHTML = "Choose File";
            }else{
            document.getElementById("fake-btn").innerHTML = mainValue.replace("C:\\fakepath\\", "");
            }
        });  
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.imgCircle')
                            .attr('src', e.target)
                            .width(200)
                            .height(200);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
        
    }
    setUser(){
        let infUser = JSON.parse(localStorage.getItem("currentUser"))
        this.user= new User(infUser["last_name"],infUser["first_name"],infUser["address"],infUser["mail"],infUser["id"],infUser["statut"],infUser["token"])
    }
}