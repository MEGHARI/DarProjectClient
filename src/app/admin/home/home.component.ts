import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { HomeService } from './homeService';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeAdminComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        //this.document.body.classList.remove('back');
    }
    constructor() {}

    ngOnInit() {
        
    }

}