import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profileService.component'

@Component({
    selector: 'profile',
    providers: [ProfileService],
    templateUrl: './profile.component.html',
    styleUrls: ['./css/profile.component.css']
})
export class ProfileComponent implements OnInit {
    constructor(private ProfileService : ProfileService) { }

    ngOnInit() { 
    }
}