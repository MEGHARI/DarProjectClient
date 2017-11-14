import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { HomeService } from './homeService.component';
import {User} from "../models/user"

@Component({
    selector: 'home',
    providers: [HomeService],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    public user : User;
    constructor(private homeService: HomeService) {
       
    }

    ngOnInit() {
       
    }
     
}