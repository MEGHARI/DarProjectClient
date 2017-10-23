import { Component, OnInit } from '@angular/core';
import { HomeService } from './home-service.component'

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
        this.homeService.doSomething().subscribe(
            data => console.log(data),
            error => console.log(error),
            () => console.log('aaa')
        );
    }


}