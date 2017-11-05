import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profileService.component'

@Component({
    selector: 'profile',
    providers: [ProfileService],
    templateUrl: './profile.component.html',
<<<<<<< HEAD
    styleUrls: ['./profile.component.css']
=======
    styleUrls: ['./css/profile.component.css']
>>>>>>> 9f49139d823fdce403bbd6713ef81f418b622acb
})
export class ProfileComponent implements OnInit {
    constructor(private ProfileService : ProfileService) { }

    ngOnInit() { 
    }
}