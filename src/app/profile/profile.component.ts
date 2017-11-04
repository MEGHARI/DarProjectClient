import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profileService.component'

@Component({
    selector: 'profile',
    providers: [ProfileService],
    templateUrl: './profile.component.html',
    styleUrls: ['../../assets/css2/profile.component.css', '../../assets/css2/style.css',
    '../../assets/css2/spinners.css', '../../assets/css2/animate.css']
})
export class ProfileComponent implements OnInit {
    constructor(private ProfileService : ProfileService) { }

    ngOnInit() { 
    }
}