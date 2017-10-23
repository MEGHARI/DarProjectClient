import { Component, OnInit } from '@angular/core';
import { HomeService } from './homeService.component'

@Component({
    selector: 'home',
    providers: [HomeService],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(private homeService: HomeService) { 

    }

    ngOnInit() { 
    }


}